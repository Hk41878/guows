const songs = [
  { title: 'Song 1', url: 'songs/song1.mp3' },
  { title: 'Song 2', url: 'songs/song2.mp3' },
  { title: 'Song 3', url: 'songs/song3.mp3' },
  { title: 'Song 4', url: 'songs/song4.mp3' },
  { title: 'Song 5', url: 'songs/song5.mp3' }
];

const CACHE_NAME = 'offline-music-v2';
const audio = document.getElementById('audioPlayer');
const songList = document.getElementById('songList');
const statusDiv = document.getElementById('status');

let currentSongIndex = -1;

navigator.serviceWorker.register('sw.js');

function isOnline() {
  return navigator.onLine;
}

function updateStatus() {
  statusDiv.textContent = isOnline() ? '🟢 Online' : '🔴 Offline';
}
window.addEventListener('online', updateStatus);
window.addEventListener('offline', updateStatus);
updateStatus();

async function isSongCached(url) {
  const cache = await caches.open(CACHE_NAME);
  const match = await cache.match(url);
  return !!match;
}

function getSaveState(url) {
  if (localStorage.getItem('offline_' + url)) return 'offline'; // ❌
  if (sessionStorage.getItem('smart_' + url)) return 'smart';   // 🤖
  return null;
}

function setSaveState(url, type) {
  if (type === 'offline') {
    localStorage.setItem('offline_' + url, true);
    sessionStorage.removeItem('smart_' + url);
  } else if (type === 'smart') {
    sessionStorage.setItem('smart_' + url, true);
  } else {
    localStorage.removeItem('offline_' + url);
    sessionStorage.removeItem('smart_' + url);
  }
}

async function cacheSong(url) {
  const cache = await caches.open(CACHE_NAME);
  const response = await fetch(url);
  await cache.put(url, response.clone());
}

function getIcon(url, caching = false) {
  if (caching) return '⚠️';
  const state = getSaveState(url);
  if (state === 'offline') return '❌';
  if (state === 'smart') return '🤖';
  return '⬇️';
}

function renderSongs() {
  songList.innerHTML = '';
  songs.forEach((song, i) => {
    const li = document.createElement('li');
    const state = getSaveState(song.url);
    const icon = getIcon(song.url);
    const isCurrent = i === currentSongIndex;

    li.innerHTML = `
      <span class="${isCurrent ? 'playing' : ''}">${song.title}</span>
      <div class="controls" data-index="${i}">
        <span class="icon">${icon}</span>
      </div>
    `;
    songList.appendChild(li);
  });
}

songList.addEventListener('click', async e => {
  const icon = e.target.closest('.icon');
  const li = e.target.closest('li');
  if (!icon) return;
  const index = parseInt(icon.parentElement.dataset.index);
  const song = songs[index];

  const state = getSaveState(song.url);

  if (state === 'offline') {
    setSaveState(song.url, null);
    const cache = await caches.open(CACHE_NAME);
    await cache.delete(song.url);
  } else if (state === 'smart') {
    setSaveState(song.url, 'offline');
  } else {
    icon.textContent = '⚠️';
    await cacheSong(song.url);
    setSaveState(song.url, 'smart');
  }

  renderSongs();
});

songList.addEventListener('click', async e => {
  if (!e.target.closest('.icon')) {
    const li = e.target.closest('li');
    if (!li) return;
    const index = parseInt(li.querySelector('.controls').dataset.index);
    playSong(index);
  }
});

async function playSong(index) {
  const song = songs[index];
  currentSongIndex = index;

  try {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(song.url);
    if (cached) {
      audio.src = URL.createObjectURL(await cached.blob());
    } else {
      audio.src = song.url;
    }
    audio.play();
    setSaveState(song.url, 'smart');
    cacheSong(song.url);
    renderSongs();
  } catch (e) {
    alert('Failed to load song');
  }
}

audio.addEventListener('ended', () => {
  if (currentSongIndex + 1 < songs.length) {
    playSong(currentSongIndex + 1);
  }
});
