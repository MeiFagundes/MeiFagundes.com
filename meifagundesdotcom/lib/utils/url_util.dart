import 'package:url_launcher/url_launcher.dart';

class UrlUtil {
  static Future<void> abrirURI(String uri, {bool encode = true}) async {
    var encodedUrl = encode ? Uri.encodeFull(uri) : uri;

    if (await canLaunch(encodedUrl)) {
      await launch(encodedUrl, forceSafariVC: false);
    } else {
      throw 'Não foi possível abrir a URI: $encodedUrl';
    }
  }
}
