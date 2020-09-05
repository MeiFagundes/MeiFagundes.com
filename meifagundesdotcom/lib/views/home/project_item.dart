import 'package:flutter/material.dart';
import 'package:meifagundesdotcom/views/shared/text_styles.dart';

class ProjectItem extends StatelessWidget {
  final String title;
  final String description;
  final String imageURI;

  ProjectItem({this.title, this.description, this.imageURI});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 20),
      child: Container(
        width: 700,
        height: 270,
        child: Card(
          elevation: 2,
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Row(
              children: [
                Expanded(
                  flex: 55,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Padding(
                        padding: const EdgeInsets.only(bottom: 5),
                        child: Text(
                          title,
                          style: TextStyles.projectTitle,
                          softWrap: true,
                        ),
                      ),
                      Expanded(
                        child: Text(
                          description,
                          style: TextStyles.projectDescription,
                          textAlign: TextAlign.left,
                          softWrap: true,
                        ),
                      ),
                      ButtonBar(
                        alignment: MainAxisAlignment.start,
                        children: <Widget>[
                          IconButton(
                            tooltip: 'Download',
                            onPressed: () {},
                            icon: Icon(Icons.download_rounded),
                            splashRadius: 25,
                          ),
                          IconButton(
                            tooltip: 'Código fonte',
                            onPressed: () {},
                            icon: Icon(Icons.code),
                            splashRadius: 25,
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                Spacer(flex: 3),
                Expanded(
                  flex: 45,
                  child: Image.asset('assets/images/$title.jpg'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
