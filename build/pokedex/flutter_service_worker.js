'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "53d9e77879b995deac72071bb2f1137b",
"assets/assets/fonts/CustomIcons.ttf": "6ef1201c4aac814584aa6eba73e2fdc8",
"assets/assets/fonts/OpenSans-Bold.ttf": "1025a6e0fb0fa86f17f57cc82a6b9756",
"assets/assets/fonts/OpenSans-ExtraBold.ttf": "fb7e3a294cb07a54605a8bb27f0cd528",
"assets/assets/fonts/OpenSans-Light.ttf": "2d0bdc8df10dee036ca3bedf6f3647c6",
"assets/assets/fonts/OpenSans-Regular.ttf": "3ed9575dcc488c3e3a5bd66620bdf5a4",
"assets/assets/fonts/OpenSans-SemiBold.ttf": "ba5cde21eeea0d57ab7efefc99596cce",
"assets/assets/images/pokeball-icon.png": "71276b2db25292ddcca30040f725216c",
"assets/assets/images/pokeball.png": "ab044126663c0a20be7d97d4dfc538ef",
"assets/assets/images/types/bug.png": "3a3b30b953371966beefd47dd15d0b4d",
"assets/assets/images/types/dark.png": "2f95a74d173ef2188f2815b90cd9bebb",
"assets/assets/images/types/dragon.png": "9770556108fd576ea103c05a59ba60bb",
"assets/assets/images/types/electric.png": "0970ee2283460ae7d58e70af35f498ba",
"assets/assets/images/types/fairy.png": "a69055fde842723045517c4614a30c29",
"assets/assets/images/types/fighting.png": "851767664f77fcac409a019a83cb137b",
"assets/assets/images/types/fire.png": "1350c3226eb20d270199f2d1054037d8",
"assets/assets/images/types/flying.png": "161b379fcda0791788a1f1e85d3ba9f1",
"assets/assets/images/types/ghost.png": "dd2d53819500b0a29dac69c31579d4d6",
"assets/assets/images/types/grass.png": "9b86457faf3d7be05356b9dfe82e0ac6",
"assets/assets/images/types/ground.png": "36ed6580789319484363e767ff6b0dd3",
"assets/assets/images/types/ice.png": "42d072e893d861c61cd1be23be5bcb6c",
"assets/assets/images/types/normal.png": "e6888b1db15aa0e31d7eae9cd30ec979",
"assets/assets/images/types/poison.png": "eafb885f418c159ef2c1b64fd0f470a7",
"assets/assets/images/types/psychic.png": "9e2e236b28c7a9dbc846a250569e100b",
"assets/assets/images/types/rock.png": "311de5ef1d2f7056b46d07e1559b731b",
"assets/assets/images/types/steel.png": "9838e0c4389c4b5f993db1c035778813",
"assets/assets/images/types/water.png": "3d1266d4d2975a35a75e0bf3cfafa3f7",
"assets/FontManifest.json": "32fdf4c86c3f03e92b974b09b1f6485a",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/NOTICES": "febb92ba18912561c179faaa924958c8",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"browserconfig.xml": "a0dea3417d07f1c91fcb63c23d1cdd4b",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/android-icon-144x144.png": "6992c07055cf589aae90b23d2082c009",
"icons/android-icon-192x192.png": "01135537cc7cdbee5ee7dcf23748a2ba",
"icons/android-icon-36x36.png": "3c59c071aaa954db7e7d361e49b6a76f",
"icons/android-icon-48x48.png": "b15f30d5ea629762e90689d35cc03298",
"icons/android-icon-72x72.png": "6b261bb86dbb415ec5fdcf003652361e",
"icons/android-icon-96x96.png": "389b7c7f9221a91c5c19fafe5b01ffa5",
"icons/apple-icon-114x114.png": "f9fe08d334379675b57ff8a5185c8b1b",
"icons/apple-icon-120x120.png": "49f6051f0a89aa4bc6469029502d4706",
"icons/apple-icon-144x144.png": "6992c07055cf589aae90b23d2082c009",
"icons/apple-icon-152x152.png": "b9b2ba2695cd0f2c0aa4b1ba9d5acfcc",
"icons/apple-icon-180x180.png": "ebdddaf3823e7ff5133c24aa9733c0ec",
"icons/apple-icon-57x57.png": "2ade4f2be46f328f93f07e03647e6ee0",
"icons/apple-icon-60x60.png": "e3b696e6573ce0c816af779966f42fc4",
"icons/apple-icon-72x72.png": "6b261bb86dbb415ec5fdcf003652361e",
"icons/apple-icon-76x76.png": "5c7d4ff7ddc5f4994fc73d01b13f6f27",
"icons/apple-icon-precomposed.png": "e1c88bc4d26bbf8e5ef3437a06c85a6e",
"icons/apple-icon.png": "e1c88bc4d26bbf8e5ef3437a06c85a6e",
"icons/favicon-16x16.png": "f98d6f77d53ce37868ece8f21e62df8b",
"icons/favicon-32x32.png": "6db95d6805866ca903a47605cb992940",
"icons/favicon-96x96.png": "389b7c7f9221a91c5c19fafe5b01ffa5",
"icons/favicon.ico": "b1c5df3b9aaf760c75436b95d05e6cea",
"icons/ms-icon-144x144.png": "6992c07055cf589aae90b23d2082c009",
"icons/ms-icon-150x150.png": "131bb1d005e497f7bfc4f5bd82667275",
"icons/ms-icon-310x310.png": "4d60227545655bb1f52549b6260d3a3e",
"icons/ms-icon-70x70.png": "fb71d3ac9e321e6482c94d98419bbf8e",
"index.html": "1656df41bac9795aa2fd62489fa42569",
"/": "1656df41bac9795aa2fd62489fa42569",
"main.dart.js": "51c50fe1d66c923ae8fb7c833858d444",
"manifest.json": "111f8adbae9b51439f248896ff7944fa",
"version.json": "ba52da1500086c7209b42343dcf84534"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
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
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
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
