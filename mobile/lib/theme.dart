import 'package:flutter/material.dart';

const mainColor = Color(0xFF009689);
const secondaryColor = Color(0xFFE60076);
const defaultColor = Color(0xFFd4d4d8);
const default500Color = Color(0xFF71717a);
const default100Color = Color(0xFFe4e4e7);
const warningColor = Color(0xFFf5a524);
const warning100Color = Color(0xFFfdedd3);
const successColor = Color(0xFF17c964);
const success100Color = Color(0xFFd1f4e0);

final ThemeData appTheme = ThemeData(
  primaryColor: mainColor,
  visualDensity: VisualDensity.adaptivePlatformDensity,
  inputDecorationTheme: const InputDecorationTheme(
    floatingLabelBehavior: FloatingLabelBehavior.never,
    contentPadding: EdgeInsets.symmetric(horizontal: 16),
    enabledBorder: outlineInputBorder,
    focusedBorder: outlineInputBorder,
    border: outlineInputBorder,
  ),
  textTheme: const TextTheme(
    bodyLarge: TextStyle(color: Colors.black, letterSpacing: 0.4),
    bodyMedium: TextStyle(
      color: Colors.black,
      fontSize: 15,
      letterSpacing: 0.4,
    ),
    bodySmall: TextStyle(color: Colors.black, letterSpacing: 0.4),
  ),
);

const OutlineInputBorder outlineInputBorder = OutlineInputBorder(
  borderRadius: BorderRadius.all(Radius.circular(12)),
  borderSide: BorderSide(color: Colors.black),
  // gapPadding: 10,
);
