const CACHE_NAME = 'offline-music-v1';
const FILES_TO_CACHE = [
  './',
  './index.html',  // ✅ Comma added
  // Songs will be cached on demand
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
