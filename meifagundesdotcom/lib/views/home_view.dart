import 'package:flutter/material.dart';

class Home extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Mei Fagundes'),
      ),
      body: Center(),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        tooltip: 'Ir para o topo',
        child: Icon(Icons.arrow_upward),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
