const songs = [
  { title: "Song1.mp3", url: "./songs/Song1.mp3" },
  { title: "Song2.mp3", url: "./songs/Song2.mp3" },
  { title: "Song3.mp3", url: "./songs/Song3.mp3" }
];

const player = document.getElementById('player');
const songsDiv = document.getElementById('songs');
const statusDiv = document.getElementById('status');
let currentIndex = 0;
let isOnline = navigator.onLine;

const CACHE_NAME = 'offline-music-v2';
const offlineSongs = JSON.parse(localStorage.getItem('offlineSongs') || '[]');

function checkCacheStatus(song) {
  return caches.open(CACHE_NAME).then(cache => cache.match(song.url)).then(response => {
    if (offlineSongs.includes(song.url)) return 'offline';
    if (response) return 'smart';
    return 'none';
  });
}

function updateStatus() {
  statusDiv.textContent = isOnline ? "You are online" : "You are offline";
}

function renderSongs() {
  songsDiv.innerHTML = "";
  songs.forEach((song, i) => {
    checkCacheStatus(song).then(state => {
      const div = document.createElement('div');
      div.className = 'song';
      if (i === currentIndex) div.classList.add('current');
      div.textContent = song.title;

      const icon = document.createElement('span');
      icon.className = 'icon';
      icon.textContent = state === 'offline' ? '❌' : state === 'smart' ? '🤖' : '⬇️';
      if (state === 'smart') icon.title = 'Smart Saved';
      if (state === 'offline') icon.title = 'Saved Offline';
      if (state === 'none') icon.title = 'Click to Save';

      icon.onclick = (e) => {
        e.stopPropagation();
        handleIconClick(song, icon);
      };

      div.onclick = () => playSong(i);
      div.appendChild(icon);
      songsDiv.appendChild(div);
    });
  });
}

function handleIconClick(song, icon) {
  caches.open(CACHE_NAME).then(async cache => {
    const cached = await cache.match(song.url);
    if (offlineSongs.includes(song.url)) {
      offlineSongs.splice(offlineSongs.indexOf(song.url), 1);
      localStorage.setItem('offlineSongs', JSON.stringify(offlineSongs));
      icon.textContent = '⬇️';
      cache.delete(song.url);
    } else if (cached) {
      offlineSongs.push(song.url);
      localStorage.setItem('offlineSongs', JSON.stringify(offlineSongs));
      icon.textContent = '❌';
    } else {
      icon.textContent = '⚠️';
      fetch(song.url)
        .then(response => {
          if (response.ok) cache.put(song.url, response.clone());
          icon.textContent = '🤖';
        })
        .catch(() => {
          icon.textContent = '⬇️';
        });
    }
  });
}

function playSong(index) {
  currentIndex = index;
  player.src = songs[currentIndex].url;
  renderSongs();
}

player.onended = () => {
  if (currentIndex < songs.length - 1) {
    playSong(currentIndex + 1);
  }
};

window.addEventListener('online', () => {
  isOnline = true;
  updateStatus();
  renderSongs();
});

window.addEventListener('offline', () => {
  isOnline = false;
  updateStatus();
  renderSongs();
});

updateStatus();
renderSongs();

navigator.serviceWorker.register('sw.js');
