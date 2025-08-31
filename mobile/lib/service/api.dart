import 'dart:convert';

import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;

// Dummy API Service
class ApiService {
  static final FlutterSecureStorage _storage = FlutterSecureStorage();

  static final int limit = 10;

  static Future<void> logout() async {
    await _storage.delete(key: 'refresh_token');
  }

  static Future<String?> getStoredToken() async {
    return await _storage.read(key: 'refresh_token');
  }

  static Future<String> refreshToken() async {
    final url = '${dotenv.env['API_URL']}/auth';
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
}
