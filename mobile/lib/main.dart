import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:provider/provider.dart';
import 'package:taskhub/providers/auth_provider.dart';
import 'package:taskhub/providers/task_provider.dart';

import 'package:taskhub/screen/splash/splash_screen.dart';
import 'package:taskhub/theme.dart';

Future<void> main() async {
  await dotenv.load(fileName: ".env");
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => TaskProvider()),
      ],
      child: const TaskManagementApp(),
    ),
  );
}

class TaskManagementApp extends StatelessWidget {
  const TaskManagementApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Task Manager',
      theme: appTheme,
      home: SplashScreen(),
      debugShowCheckedModeBanner: false,
    );
  }
}
