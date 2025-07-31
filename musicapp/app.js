const songs = [
  "songs/song1.mp3",
  "songs/song2.mp3",
  "songs/song3.mp3",
  "songs/song4.mp3",
  "songs/song5.mp3"
];

const CACHE_NAME = 'offline-music-v1';
const maxSmartCache = 30;

const audio = document.getElementById('audio');
const playlist = document.getElementById('playlist');
const nowPlaying = document.getElementById('nowPlaying');

let currentIndex = 0;
let smartCacheList = JSON.parse(localStorage.getItem('smartCacheList') || '[]');

function getCacheKeyPermanent(song) {
  return 'permanent_' + song;
}
function getCacheKeySmart(song) {
  return 'smart_' + song;
}

function getStatusIcon(song) {
  if (localStorage.getItem(getCacheKeyPermanent(song))) return "❌";
  if (localStorage.getItem(getCacheKeySmart(song))) return "🤖";
  return "⬇️";
}

async function cacheSong(url) {
  const cache = await caches.open(CACHE_NAME);
  const response = await fetch(url);
  await cache.put(url, response.clone());
}

async function removeSongFromCache(url) {
  const cache = await caches.open(CACHE_NAME);
  await cache.delete(url);
}

async function smartSaveSong(song) {
  if (localStorage.getItem(getCacheKeyPermanent(song)) || localStorage.getItem(getCacheKeySmart(song))) {
    return;
  }
  await cacheSong(song);
  localStorage.setItem(getCacheKeySmart(song), Date.now());
  smartCacheList.push(song);
  if (smartCacheList.length > maxSmartCache) {
    // Remove oldest smart cached song if not permanent
    const cache = await caches.open(CACHE_NAME);
    while (smartCacheList.length > maxSmartCache) {
      const oldest = smartCacheList.shift();
      if (!localStorage.getItem(getCacheKeyPermanent(oldest))) {
        await cache.delete(oldest);
        localStorage.removeItem(getCacheKeySmart(oldest));
      }
    }
  }
  localStorage.setItem('smartCacheList', JSON.stringify(smartCacheList));
}

function updateOnlineStatus() {
  let statusElem = document.getElementById('onlineStatus');
  if (!statusElem) {
    statusElem = document.createElement('div');
    statusElem.id = 'onlineStatus';
    statusElem.style.textAlign = 'center';
    statusElem.style.marginBottom = '15px';
    statusElem.style.fontWeight = 'bold';
    statusElem.style.color = 'white';
    document.body.insertBefore(statusElem, document.body.firstChild);
  }
  statusElem.textContent = navigator.onLine ? 'You are ONLINE' : 'You are OFFLINE';
}

async function renderPlaylist() {
  playlist.innerHTML = '';
  updateOnlineStatus();

  const offline = !navigator.onLine;

  for (let i = 0; i < songs.length; i++) {
    const song = songs[i];
    const icon = getStatusIcon(song);

    // If offline, show only saved songs (smart or permanent)
    if (offline && icon === '⬇️') continue;

    const li = document.createElement('li');
    li.classList.toggle('playing', i === currentIndex);
    li.textContent = song.split('/').pop();

    const btn = document.createElement('button');
    btn.textContent = icon;
    btn.dataset.index = i;

    btn.onclick = async (e) => {
      e.stopPropagation();
      const idx = +btn.dataset.index;
      const s = songs[idx];
      const status = getStatusIcon(s);

      if (status === '⬇️') {
        // Only cache, no auto-play
        await cacheSong(s);
        localStorage.setItem(getCacheKeyPermanent(s), true); // treat download as permanent save
        renderPlaylist();
      } else if (status === '🤖') {
        // Promote to permanent save (❌)
        localStorage.setItem(getCacheKeyPermanent(s), true);
        localStorage.removeItem(getCacheKeySmart(s));
        const idxInList = smartCacheList.indexOf(s);
        if (idxInList !== -1) smartCacheList.splice(idxInList, 1);
        localStorage.setItem('smartCacheList', JSON.stringify(smartCacheList));
        renderPlaylist();
      } else if (status === '❌') {
        // Remove from cache & storage
        localStorage.removeItem(getCacheKeyPermanent(s));
        localStorage.removeItem(getCacheKeySmart(s));
        const idxInList = smartCacheList.indexOf(s);
        if (idxInList !== -1) {
          smartCacheList.splice(idxInList, 1);
          localStorage.setItem('smartCacheList', JSON.stringify(smartCacheList));
        }
        await removeSongFromCache(s);
        renderPlaylist();
      }
    };

    li.appendChild(btn);
    li.onclick = () => playSong(i);
    playlist.appendChild(li);
  }
}

async function playSong(index) {
  currentIndex = index;
  audio.src = songs[index];
  nowPlaying.textContent = 'Now Playing: ' + songs[index].split('/').pop();
  await audio.play();

  if (navigator.onLine) {
    await smartSaveSong(songs[index]);
    renderPlaylist();
  }
}

audio.addEventListener('ended', () => {
  let next = (currentIndex + 1) % songs.length;
  playSong(next);
});

window.addEventListener('load', () => {
  updateOnlineStatus();
  renderPlaylist();
  playSong(currentIndex);
});

window.addEventListener('online', () => {
  updateOnlineStatus();
  renderPlaylist();
});

window.addEventListener('offline', () => {
  updateOnlineStatus();
  renderPlaylist();
});
