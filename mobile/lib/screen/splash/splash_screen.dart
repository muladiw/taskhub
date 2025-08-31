import 'package:flutter/material.dart';
import 'package:taskhub/screen/login/login_screen.dart';
import 'package:taskhub/screen/task/task_screen.dart';
import 'package:taskhub/service/api.dart';
import 'package:flutter_svg/flutter_svg.dart';

// Splash Screen
class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    _checkAuthStatus();
  }

  Future<void> _checkAuthStatus() async {
    await Future.delayed(Duration(seconds: 1)); // Simulate splash delay

    String? token = await ApiService.getStoredToken();

    if (!mounted) return;

    if (token != null) {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => TaskListScreen()),
      );
    } else {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => LoginScreen()),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            SvgPicture.asset(
              'assets/images/splash.svg',
              height: 265,
              width: 235,
            ),
          ],
        ),
      ),
    );
  }
}
