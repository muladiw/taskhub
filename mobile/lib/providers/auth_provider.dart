import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;

class AuthProvider extends ChangeNotifier {
  static final FlutterSecureStorage _storage = FlutterSecureStorage();
  Future<void> setToken(String value) async {
    await _storage.write(key: 'refresh_token', value: value);
  }

  static Future<void> logout() async {
    await _storage.delete(key: 'refresh_token');
  }

  Future<void> login(String email, String password) async {
    final url = '${dotenv.env['API_URL']}/auth';
    final uri = Uri.parse(url);
    final response = await http.post(
      uri,
      body: {"email": email, "password": password},
    );
    final finalResponse = jsonDecode(response.body);
    if (response.statusCode <= 201) {
      await setToken(finalResponse['auth']['refreshToken']);
      return;
    }

    throw Exception(finalResponse['errors']);
  }

  Future<Map<String, dynamic>> signup(String email, String password) async {
    final url = '${dotenv.env['API_URL']}/user';
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
}
