const songs = [
  'song1.mp3',
  'song2.mp3',
  'song3.mp3',
  'song4.mp3',
  'song5.mp3'
];

const songList = document.getElementById('songList');
const player = document.getElementById('player');
const statusText = document.getElementById('status');

let currentIndex = -1;
const CACHE_NAME = 'music-cache';

window.addEventListener('load', () => {
  updateNetworkStatus();
  navigator.serviceWorker.register('sw.js');
  renderList();
});

window.addEventListener('online', updateNetworkStatus);
window.addEventListener('offline', updateNetworkStatus);

function updateNetworkStatus() {
  statusText.textContent = 'Status: ' + (navigator.onLine ? 'Online' : 'Offline');
  renderList();
}

async function renderList() {
  const cache = await caches.open(CACHE_NAME);
  songList.innerHTML = '';

  for (let i = 0; i < songs.length; i++) {
    const url = songs[i];
    const req = new Request(url);
    const cached = await cache.match(req);

    let icon = '⬇️';
    if (downloading.has(url)) {
      icon = '⚠️';
    } else if (permanent.has(url)) {
      icon = '❌';
    } else if (cached) {
      icon = '🤖';
    }

    const li = document.createElement('li');
    li.innerHTML = `<span ${i === currentIndex ? 'class="playing"' : ''}>${url}</span> 
      <span class="status" data-url="${url}" data-index="${i}" data-icon="${icon}">${icon}</span>`;
    songList.appendChild(li);
  }

  attachClickHandlers();
}

function attachClickHandlers() {
  document.querySelectorAll('.status').forEach(btn => {
    btn.onclick = async (e) => {
      const url = e.target.dataset.url;
      const index = parseInt(e.target.dataset.index);
      const icon = e.target.dataset.icon;

      if (icon === '⬇️') {
        savePermanent(url);
      } else if (icon === '🤖') {
        savePermanent(url);
      } else if (icon === '❌') {
        removeFromCache(url);
      }
      renderList();
    };
  });

  document.querySelectorAll('li span:first-child').forEach(span => {
    span.onclick = () => {
      const index = songs.indexOf(span.textContent.trim());
      playSong(index);
    };
  });
}

async function playSong(index) {
  currentIndex = index;
  const url = songs[index];
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(url);

  if (!cached) {
    smartSave(url);
  }

  player.src = url;
  renderList();
}

player.onended = () => {
  if (currentIndex + 1 < songs.length) {
    playSong(currentIndex + 1);
  }
};

// Smart save (temporary cache)
const downloading = new Set();
async function smartSave(url) {
  if (downloading.has(url)) return;
  downloading.add(url);
  renderList();

  const res = await fetch(url);
  const cache = await caches.open(CACHE_NAME);
  await cache.put(url, res.clone());

  downloading.delete(url);
  renderList();
}

// Permanent save
const permanent = new Set();
async function savePermanent(url) {
  const res = await fetch(url);
  const cache = await caches.open(CACHE_NAME);
  await cache.put(url, res.clone());
  permanent.add(url);
  renderList();
}

// Remove from cache
async function removeFromCache(url) {
  const cache = await caches.open(CACHE_NAME);
  await cache.delete(url);
  permanent.delete(url);
  renderList();
}
