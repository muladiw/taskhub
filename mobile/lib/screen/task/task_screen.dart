import 'package:flutter/material.dart';
import 'package:taskhub/model/task.dart';
import 'package:taskhub/screen/login/login_screen.dart';
import 'package:taskhub/screen/task/task_form_screen.dart';
import 'package:taskhub/service/api.dart';
import 'package:taskhub/theme.dart';

class TaskListScreen extends StatefulWidget {
  const TaskListScreen({super.key});

  @override
  State<TaskListScreen> createState() => _TaskListScreenState();
}

class _TaskListScreenState extends State<TaskListScreen> {
  List<Task> _tasks = [];
  bool _isLoading = true;
  bool _hasMore = true;
  int _startPage = 0;
  final ScrollController _listViewController = ScrollController();

  @override
  void initState() {
    super.initState();
    _checkAuthStatus();
    _loadTasks();

    _listViewController.addListener(() {
      if (_listViewController.position.pixels + 80 >
              _listViewController.position.maxScrollExtent &&
          !_isLoading &&
          _tasks.isNotEmpty &&
          _hasMore) {
        setState(() {
          _isLoading = true;
          _startPage += 10;
        });
        _loadTasks();
      }
    });
  }

  @override
  void dispose() {
    _listViewController.dispose();
    super.dispose();
  }

  Future<void> _checkAuthStatus() async {
    String? token = await ApiService.getStoredToken();

    if (!mounted) return;

    if (token == null) {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => LoginScreen()),
      );
    }
  }

  Future<void> _loadTasks() async {
    try {
      List<Task> tasks = await ApiService.getTasks(_startPage);
      setState(() {
        _tasks = [..._tasks, ...tasks];
        _isLoading = false;
        _hasMore = tasks.length == 10;
      });
    } catch (e) {
      setState(() => _isLoading = false);
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Failed to load tasks: ${e.toString()}')),
      );
    }
  }

  Future<void> _refreshIndicator() async {
    setState(() {
      _startPage = 0;
      _tasks = [];
    });
    await _loadTasks();
  }

  Future<void> _logout() async {
    await ApiService.logout();
    if (!mounted) return;
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => LoginScreen()),
    );
  }

  Future<void> _deleteTask(Task task) async {
    try {
      await ApiService.deleteTask(task.id);
      setState(() {
        _tasks.removeWhere((t) => t.id == task.id);
      });

      if (!mounted) return;
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text('Task deleted successfully')));
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Failed to delete task: ${e.toString()}')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Taskhub'),
        backgroundColor: mainColor,
        foregroundColor: Colors.white,
        actions: [
          Container(
            padding: EdgeInsetsGeometry.only(right: 16),
            child: GestureDetector(
              child: Icon(Icons.logout),
              onTap: () => {_logout()},
            ),
          ),
        ],
      ),
      body: _tasks.isEmpty
          ? Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.task_outlined, size: 80, color: Colors.grey),
                  SizedBox(height: 16),
                  Text(
                    'No tasks yet!',
                    style: TextStyle(fontSize: 18, color: Colors.grey),
                  ),
                  Text(
                    'Tap the + button to add your first task',
                    style: TextStyle(fontSize: 14, color: Colors.grey),
                  ),
                ],
              ),
            )
          : RefreshIndicator(
              onRefresh: _refreshIndicator,
              child: ListView.builder(
                controller: _listViewController,
                padding: EdgeInsets.all(16),
                itemCount: _tasks.length,
                itemBuilder: (context, index) {
                  Task task = _tasks[index];
                  return Card(
                    margin: EdgeInsets.only(bottom: 8),
                    child: ListTile(
                      contentPadding: EdgeInsets.only(
                        left: 16,
                        top: 8,
                        bottom: 8,
                      ),
                      leading: Container(
                        width: 60,
                        height: 60,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: task.status == 'TO_DO'
                              ? default100Color
                              : task.status == 'IN_PROGRESS'
                              ? warning100Color
                              : success100Color,
                        ),
                        child: Icon(
                          task.status == 'TO_DO'
                              ? Icons.circle_outlined
                              : task.status == 'IN_PROGRESS'
                              ? Icons.access_time
                              : Icons.check_circle,
                          color: task.status == 'TO_DO'
                              ? default500Color
                              : task.status == 'IN_PROGRESS'
                              ? warningColor
                              : successColor,
                          size: 30,
                        ),
                      ),
                      title: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(task.title),
                          Chip(
                            label: Text(
                              task.status == 'TO_DO'
                                  ? 'To Do'
                                  : task.status == 'IN_PROGRESS'
                                  ? 'In Progress'
                                  : 'Done',
                            ),
                            padding: EdgeInsets.all(0),
                            backgroundColor: task.status == 'TO_DO'
                                ? defaultColor
                                : task.status == 'IN_PROGRESS'
                                ? warningColor
                                : successColor,
                          ),
                        ],
                      ),
                      trailing: PopupMenuButton<String>(
                        onSelected: (value) async {
                          if (value == 'edit') {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) =>
                                    TaskFormScreen(task: task),
                              ),
                            ).then((_) => _refreshIndicator());
                          } else if (value == 'delete') {
                            await _deleteTask(task);
                            _refreshIndicator();
                          }
                        },
                        itemBuilder: (BuildContext context) {
                          return [
                            PopupMenuItem<String>(
                              value: 'edit',
                              child: Row(
                                children: [
                                  Icon(Icons.edit),
                                  SizedBox(width: 8),
                                  Text('Edit'),
                                ],
                              ),
                            ),
                            PopupMenuItem<String>(
                              value: 'delete',
                              child: Row(
                                children: [
                                  Icon(Icons.delete, color: Colors.red),
                                  SizedBox(width: 8),
                                  Text(
                                    'Delete',
                                    style: TextStyle(color: Colors.red),
                                  ),
                                ],
                              ),
                            ),
                          ];
                        },
                      ),
                    ),
                  );
                },
              ),
            ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => TaskFormScreen()),
          ).then((_) => _refreshIndicator());
        },
        backgroundColor: mainColor,
        foregroundColor: Colors.white,
        child: Icon(Icons.add),
      ),
    );
  }
}
