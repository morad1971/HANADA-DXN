// This is a basic service worker file.

self.addEventListener('install', event => {
  console.log('Service worker installing...');
  // Add a call to skipWaiting here
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('Service worker activating...');
});

self.addEventListener('fetch', event => {
  // We are not caching anything in this basic example
  event.respondWith(fetch(event.request));
});
