import 'package:flutter/material.dart';
import 'package:meifagundesdotcom/utils/url_util.dart';
import 'package:meifagundesdotcom/views/home/project_list_view.dart';
import 'package:meifagundesdotcom/views/shared/custom_icons.dart';

class Home extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Mei Fagundes'),
        centerTitle: true,
      ),
      body: Center(
        child: ProjectListView(),
      ),
      floatingActionButton: ButtonBar(
        children: <Widget>[
          FloatingActionButton(
            tooltip: 'E-mail',
            onPressed: () => UrlUtil.abrirURI('mailto:mei@meifagundes.com'),
            child: Icon(Icons.email),
          ),
          FloatingActionButton(
            tooltip: 'GitHub',
            onPressed: () => UrlUtil.abrirURI('https://github.com/MeiFagundes'),
            child: Icon(CustomIcons.github),
          ),
        ],
      ),
    );
  }
}
