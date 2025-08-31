import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;
import 'package:taskhub/model/task.dart';
import 'package:taskhub/service/api.dart';

class TaskProvider extends ChangeNotifier {
  static final FlutterSecureStorage _storage = FlutterSecureStorage();
  final int limit = 10;
  List<Task> _tasks = [];
  List<Task> get tasks => _tasks;
  bool _isLoading = true;
  bool get isLoading => _isLoading;
  bool _hasMore = true;
  bool get hasMore => _hasMore;
  int _startPage = 0;
  int get startPage => _startPage;

  Future<void> setToken(String value) async {
    await _storage.write(key: 'refresh_token', value: value);
  }

  static Future<void> logout() async {
    await _storage.delete(key: 'refresh_token');
  }

  Future<void> getTasks([int startPage = 0]) async {
    final url = '${dotenv.env['API_URL']}/task';
    final uri = Uri.parse(url).replace(
      queryParameters: {
        'start': startPage.toString(),
        'limit': limit.toString(),
      },
    );
    final accessToken = await ApiService.refreshToken();
    final response = await http.get(
      uri,
      headers: {
        'Authorization': 'Bearer $accessToken',
        'Content-Type': 'application/json', // optional
      },
    );
    final finalResponse = jsonDecode(response.body);
    if (response.statusCode <= 200) {
      _tasks = [
        ..._tasks,
        ...((finalResponse['task'] as List).map((item) {
          return Task(
            id: item['id'],
            title: item['title'],
            status: item['status'],
          );
        }).toList()),
      ];
      _hasMore = finalResponse['task'].length == 10;

      _isLoading = false;
      notifyListeners();
      return;
    } else {
      _isLoading = false;
      notifyListeners();
    }

    throw Exception(finalResponse['errors']);
  }

  Future<void> refreshIndicator() async {
    _isLoading = true;
    _startPage = 0;
    _tasks = [];
    notifyListeners();

    await getTasks();
  }

  Future<void> loadMore() async {
    _isLoading = true;
    _startPage += 10;
    notifyListeners();

    await getTasks(_startPage);
  }

  Future<void> createTask(String title, String status) async {
    final url = '${dotenv.env['API_URL']}/task';
    final uri = Uri.parse(url);
    final accessToken = await ApiService.refreshToken();
    final response = await http.post(
      uri,
      headers: {'Authorization': 'Bearer $accessToken'},
      body: {"title": title, "status": status},
    );
    if (response.statusCode <= 201) {
      return;
    }
    final finalResponse = jsonDecode(response.body);

    throw Exception(finalResponse['errors']);
  }

  Future<void> updateTask(
    String taskId, {
    String? title,
    String? status,
    bool? isCompleted,
  }) async {
    final url = '${dotenv.env['API_URL']}/task';
    final uri = Uri.parse('$url/$taskId');
    final accessToken = await ApiService.refreshToken();
    final response = await http.put(
      uri,
      headers: {'Authorization': 'Bearer $accessToken'},
      body: {"title": title, "status": status},
    );
    if (response.statusCode <= 201) {
      return;
    }
    final finalResponse = jsonDecode(response.body);

    throw Exception(finalResponse['errors']);
  }

  Future<void> deleteTask(String taskId) async {
    final url = '${dotenv.env['API_URL']}/task';
    final uri = Uri.parse('$url/$taskId');
    final accessToken = await ApiService.refreshToken();
    final response = await http.delete(
      uri,
      headers: {'Authorization': 'Bearer $accessToken'},
    );
    if (response.statusCode <= 201) {
      return;
    }
    final finalResponse = jsonDecode(response.body);

    throw Exception(finalResponse['errors']);
  }
}
