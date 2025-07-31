const songs = [
  'song1.mp3',
  'song2.mp3',
  'song3.mp3',
  'song4.mp3',
  'song5.mp3'
];

const CACHE_NAME = 'offline-music-v1';
const player = document.getElementById('player');
const songListDiv = document.getElementById('song-list');
const nowPlayingDiv = document.getElementById('now-playing');
const statusDiv = document.getElementById('status');

let currentSongIndex = -1;

async function checkCacheStatus(song) {
  const cache = await caches.open(CACHE_NAME);
  const response = await cache.match(song);
  if (!response) return '⬇️'; // Not saved
  const headers = [...response.headers];
  if (headers.some(([key]) => key === 'X-Smart-Save')) return '🤖';
  if (headers.some(([key]) => key === 'X-Permanent')) return '❌';
  return '⚠️'; // Incomplete
}

async function updateUI() {
  songListDiv.innerHTML = '';
  for (let i = 0; i < songs.length; i++) {
    const song = songs[i];
    const icon = await checkCacheStatus(song);
    const div = document.createElement('div');
    div.className = 'song';
    div.innerHTML = `
      ${song} <button onclick="playSong(${i})">▶️</button>
      <button onclick="toggleSave('${song}')">${icon}</button>
    `;
    songListDiv.appendChild(div);
  }
}

function playSong(index) {
  currentSongIndex = index;
  const song = songs[index];
  player.src = song;
  nowPlayingDiv.textContent = `Now Playing: ${song}`;
}

player.addEventListener('ended', () => {
  if (currentSongIndex + 1 < songs.length) {
    playSong(currentSongIndex + 1);
  }
});

async function toggleSave(song) {
  const cache = await caches.open(CACHE_NAME);
  const existing = await cache.match(song);
  if (!existing) {
    // Save permanently
    const res = await fetch(song);
    const newRes = new Response(res.body, {
      headers: { 'X-Permanent': 'true' }
    });
    await cache.put(song, newRes);
  } else {
    const headers = [...existing.headers];
    if (headers.some(([key]) => key === 'X-Permanent')) {
      await cache.delete(song);
    } else {
      const res = await fetch(song);
      const newRes = new Response(res.body, {
        headers: { 'X-Permanent': 'true' }
      });
      await cache.put(song, newRes);
    }
  }
  updateUI();
}

function updateOnlineStatus() {
  statusDiv.textContent = navigator.onLine ? "You are online 🌐" : "You are offline 🔌";
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

navigator.serviceWorker.register('sw.js').then(() => {
  updateOnlineStatus();
  updateUI();
});
