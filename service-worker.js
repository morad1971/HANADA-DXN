self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open("hanada-cache").then(function(cache) {
      return cache.addAll([
        "/HANADA-DXN/",
        "/HANADA-DXN/index.html",
        "/HANADA-DXN/icons/icon-192.png",
        "/HANADA-DXN/icons/icon-512.png"
      ]);
    })
  );
});

self.addEventListener("fetch", function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
