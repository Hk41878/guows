const CACHE_NAME = 'offline-music-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).then((response) => {
          const url = event.request.url;
          if (url.endsWith('.mp3')) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              const headers = new Headers(clone.headers);
              headers.set('X-Smart-Save', 'true');
              cache.put(event.request, new Response(clone.body, { headers }));
            });
          }
          return response;
        })
      );
    })
  );
});
