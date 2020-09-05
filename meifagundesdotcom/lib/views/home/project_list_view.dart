import 'package:flutter/material.dart';
import 'package:meifagundesdotcom/views/home/project_item.dart';

class ProjectListView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.all(30),
        child: Column(
          children: [
            ProjectItem(
              title: 'Starlight',
              description:
                  'Uma Engine de Natural Language Processing (NLP) que incorpora Machine Learning através da framework ML.NET. O processamento é feito através de Datasets para treinamento da IA.',
            ),
            ProjectItem(
              title: 'Starlight',
              description:
                  'Uma Engine de Natural Language Processing (NLP) que incorpora Machine Learning através da framework ML.NET. O processamento é feito através de Datasets para treinamento da IA.',
            ),
            ProjectItem(
              title: 'Starlight',
              description:
                  'Uma Engine de Natural Language Processing (NLP) que incorpora Machine Learning através da framework ML.NET. O processamento é feito através de Datasets para treinamento da IA.',
            ),
          ],
        ),
      ),
    );
  }
}
