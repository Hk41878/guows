if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(() => console.log('Service Worker Registered'));
}

function addToOffline() {
  caches.open('offline-music-v1').then(cache => {
    cache.add('songs/song1.mp3').then(() => {
      alert('Song cached for offline use.');
    });
  });
}

function removeFromOffline() {
  caches.open('offline-music-v1').then(cache => {
    cache.delete('songs/song1.mp3').then(() => {
      alert('Song removed from offline cache.');
    });
  });
}
