'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "b8295c10f510c53ba93a541c7d4c7d1d",
"assets/AssetManifest.bin.json": "2a2c7b58146e5b38ef4e61f99ac81ac2",
"assets/AssetManifest.json": "061c3031b0eb7c7e738e98711cb8edd0",
"assets/assets/fonts/CustomIcons.ttf": "e6beb57236ccbf3f04c83543cd4df86e",
"assets/assets/fonts/OpenSans-Bold.ttf": "1025a6e0fb0fa86f17f57cc82a6b9756",
"assets/assets/fonts/OpenSans-ExtraBold.ttf": "fb7e3a294cb07a54605a8bb27f0cd528",
"assets/assets/fonts/OpenSans-Light.ttf": "2d0bdc8df10dee036ca3bedf6f3647c6",
"assets/assets/fonts/OpenSans-Regular.ttf": "3ed9575dcc488c3e3a5bd66620bdf5a4",
"assets/assets/fonts/OpenSans-SemiBold.ttf": "ba5cde21eeea0d57ab7efefc99596cce",
"assets/assets/images/DexDB.jpg": "149b1b5943f504f7b84143e4e4924715",
"assets/assets/images/ListDeclutteringTool.jpg": "e26063dbc843a32894cd1e34220d477c",
"assets/assets/images/mei.jpg": "7c666104b692fbffd581f34405290aee",
"assets/assets/images/MyQuimicaLab.jpg": "1e9901d54f0b8db05f9428ae393115e4",
"assets/assets/images/PolarisAI.png": "64a8c36dfe40717e8ec5a9e18e9a2c1f",
"assets/assets/images/Sqrt8086.jpg": "2cdeac02efdeb6730feedc93e9ed3cbe",
"assets/assets/images/Starlight.jpg": "a41d7b2d99e90e0f62493807d7f61df1",
"assets/FontManifest.json": "c241d263772c5578e40e7d443c8b14da",
"assets/fonts/MaterialIcons-Regular.otf": "2e5ec0dfd6d263191493668ffc89f408",
"assets/NOTICES": "bff9654a419be445891d2c3384858e59",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "26eef3024dbc64886b7f48e1b6fb05cf",
"canvaskit/canvaskit.js.symbols": "efc2cd87d1ff6c586b7d4c7083063a40",
"canvaskit/canvaskit.wasm": "e7602c687313cfac5f495c5eac2fb324",
"canvaskit/chromium/canvaskit.js": "b7ba6d908089f706772b2007c37e6da4",
"canvaskit/chromium/canvaskit.js.symbols": "e115ddcfad5f5b98a90e389433606502",
"canvaskit/chromium/canvaskit.wasm": "ea5ab288728f7200f398f60089048b48",
"canvaskit/skwasm.js": "ac0f73826b925320a1e9b0d3fd7da61c",
"canvaskit/skwasm.js.symbols": "96263e00e3c9bd9cd878ead867c04f3c",
"canvaskit/skwasm.wasm": "828c26a0b1cc8eb1adacbdd0c5e8bcfa",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "4b2350e14c6650ba82871f60906437ea",
"flutter_bootstrap.js": "6e658b6c0d56b5d8d4dadca2b0fb5a08",
"icons/android-icon-144x144.png": "2a38a50f4f90dc800b50e6bf68bac979",
"icons/android-icon-192x192.png": "3f8bc2350f91b5989bc9035e87fd9250",
"icons/android-icon-36x36.png": "9f7e40e042c4888e9e3bc3700a83b690",
"icons/android-icon-48x48.png": "7595ebd6db37306aab3bad100d3defea",
"icons/android-icon-72x72.png": "c3f90281582725a09b07f46c5ed358c8",
"icons/android-icon-96x96.png": "d94327b3c574a3bb277c17c126fbcf17",
"icons/apple-icon-114x114.png": "1a1ffcb1ac0bec7023e16e032987899e",
"icons/apple-icon-120x120.png": "3e2f67de48af67275cf4ff6fdf56232e",
"icons/apple-icon-144x144.png": "2a38a50f4f90dc800b50e6bf68bac979",
"icons/apple-icon-152x152.png": "71390fddb1824119e2a22697ea677d0e",
"icons/apple-icon-180x180.png": "cde369fcfe7b2cc5893d05d6eedc3121",
"icons/apple-icon-57x57.png": "e8a4e3a91e34ab598e19cb4ea7371502",
"icons/apple-icon-60x60.png": "0a781aae3a24d3ab58e6cabb2a1a7e0b",
"icons/apple-icon-72x72.png": "c3f90281582725a09b07f46c5ed358c8",
"icons/apple-icon-76x76.png": "6746129fddcf7d77b1ec3fa2115b8daf",
"icons/apple-icon-precomposed.png": "ebde967b2fbe40d0067bb95b4bcba75a",
"icons/apple-icon.png": "ebde967b2fbe40d0067bb95b4bcba75a",
"icons/browserconfig.xml": "97775b1fd3b6e6c13fc719c2c7dd0ffe",
"icons/favicon-16x16.png": "e3235456bdb0dc31aafddab3d1e20634",
"icons/favicon-32x32.png": "01666af0702f210cb34940de3af89f1c",
"icons/favicon-96x96.png": "d94327b3c574a3bb277c17c126fbcf17",
"icons/favicon.ico": "74ed789dbaf367a587aa137dc80831b5",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/manifest.json": "e50e6a1c9ed6452635d3211f39501e0d",
"icons/ms-icon-144x144.png": "2a38a50f4f90dc800b50e6bf68bac979",
"icons/ms-icon-150x150.png": "1cfbeace14d14bcdcf94794e8aa7ae0c",
"icons/ms-icon-310x310.png": "19f0d5d1f69bb33b390547690894f573",
"icons/ms-icon-70x70.png": "8bf084618096ff0e0c68122411e71f65",
"index.html": "5b27c1f8aaa6beffcc5afdaef58ecacf",
"/": "5b27c1f8aaa6beffcc5afdaef58ecacf",
"main.dart.js": "097a795e0e0a934b7b4c6710edc68abc",
"manifest.json": "863cdce1400a4612511e30e3ec5052b6",
"version.json": "4797c345d043f7f71dc633fb99cac0c4"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
