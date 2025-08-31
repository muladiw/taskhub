import 'dart:convert';

import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:taskhub/model/task.dart';
import 'package:taskhub/model/user.dart';
import 'package:http/http.dart' as http;

// Dummy API Service
class ApiService {
  static const String baseUrl = 'https://api.taskmanager.com';
  static final FlutterSecureStorage _storage = FlutterSecureStorage();

  static final int limit = 10;

  static final Map<String, User> users = {
    'user123': User(id: 'user123', email: 'user@example.com'),
  };

  // Authentication
  static Future<Map<String, dynamic>> login(
    String email,
    String password,
  ) async {
    final url = 'http://10.137.43.200:8000/auth';
    final uri = Uri.parse(url);
    final response = await http.post(
      uri,
      body: {"email": email, "password": password},
    );
    final finalResponse = jsonDecode(response.body);
    if (response.statusCode == 201) {
      await _storage.write(
        key: 'refresh_token',
        value: finalResponse['auth']['refreshToken'],
      );
      return {};
    }

    throw Exception(finalResponse['errors']);
  }

  static Future<Map<String, dynamic>> signup(
    String email,
    String password,
  ) async {
    final url = 'http://10.137.43.200:8000/user';
    final uri = Uri.parse(url);
    final response = await http.post(
      uri,
      body: {"email": email, "password": password},
    );
    final finalResponse = jsonDecode(response.body);
    if (response.statusCode == 201) {
      return {};
    }

    throw Exception(finalResponse['errors']);
  }

  static Future<void> logout() async {
    await _storage.delete(key: 'refresh_token');
  }

  static Future<String?> getStoredToken() async {
    return await _storage.read(key: 'refresh_token');
  }

  static Future<String?> getStoredUserId() async {
    return await _storage.read(key: 'user_id');
  }

  static Future<String> refreshToken() async {
    final url = 'http://10.137.43.200:8000/auth';
    final uri = Uri.parse(url);
    String? token = await getStoredToken();
    final response = await http.put(uri, body: {"refreshToken": token});
    final finalResponse = jsonDecode(response.body);
    if (response.statusCode <= 201) {
      return finalResponse['auth']['accessToken'];
    } else {
      await _storage.delete(key: 'refresh_token');
    }

    throw Exception(finalResponse['errors']);
  }

  // Task CRUD operations
  static Future<List<Task>> getTasks([int startPage = 0]) async {
    final url = 'http://10.137.43.200:8000/task';
    final uri = Uri.parse(url).replace(
      queryParameters: {
        'start': startPage.toString(),
        'limit': limit.toString(),
      },
    );
    final accessToken = await refreshToken();
    final response = await http.get(
      uri,
      headers: {
        'Authorization': 'Bearer $accessToken',
        'Content-Type': 'application/json', // optional
      },
    );
    final finalResponse = jsonDecode(response.body);
    if (response.statusCode <= 200) {
      return (finalResponse['task'] as List).map((item) {
        return Task(
          id: item['id'],
          title: item['title'],
          status: item['status'],
        );
      }).toList();
    }

    throw Exception(finalResponse['errors']);
  }

  static Future<void> createTask(String title, String status) async {
    final url = 'http://10.137.43.200:8000/task';
    final uri = Uri.parse(url);
    final accessToken = await refreshToken();
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

  static Future<void> updateTask(
    String taskId, {
    String? title,
    String? status,
    bool? isCompleted,
  }) async {
    final url = 'http://10.137.43.200:8000/task';
    final uri = Uri.parse('$url/$taskId');
    final accessToken = await refreshToken();
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

  static Future<void> deleteTask(String taskId) async {
    final url = 'http://10.137.43.200:8000/task';
    final uri = Uri.parse('$url/$taskId');
    final accessToken = await refreshToken();
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
