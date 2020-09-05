import 'package:flutter/material.dart';
import 'package:meifagundesdotcom/views/home/home_view.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Mei Fagundes',
      theme: ThemeData(
          primarySwatch: Colors.pink,
          visualDensity: VisualDensity.adaptivePlatformDensity,
          buttonColor: Colors.pink[400],
          iconTheme: IconThemeData(color: Colors.pink[400], size: 25)),
      home: Home(),
    );
  }
}
