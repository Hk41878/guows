const songs = [
  { title: "Track 1", url: "https://guows.com/songs/singers/anuv_jain/Aditya%20Rikhari%20-%20SAMJHO%20NA%20.mp3", background: "url('https://c.saavncdn.com/852/Samjho-Na-Hindi-2022-20220209214141-500x500.jpg')" },
  { title: "Track 2", url: "https://guows.com/songs/mp3/anuvjain/music2.mp3", background: "url('https://i.scdn.co/image/ab67616d0000b2738537cf974af2c408bdd8e1a6')" },
  { title: "Track 3", url: "https://guows.com/songs/mp3/anuvjain/music3.mp3", background: "url('https://example.com/bg3.jpg')" },
  { title: "Track 4", url: "https://guows.com/songs/mp3/anuvjain/music4.mp3", background: "url('https://example.com/bg4.jpg')" },
  { title: "Track 5", url: "https://guows.com/songs/mp3/anuvjain/music5.mp3", background: "url('https://example.com/bg5.jpg')" },
];

let originalList = [...songs];
let shuffledList = [...songs];
let current = 0;
let isShuffling = false;

const title = document.getElementById('title');
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const progress = document.getElementById('progress');
const shuffleBtn = document.getElementById('shuffle');

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getCurrentList() {
  return isShuffling ? shuffledList : originalList;
}

function loadSong(index) {
  const list = getCurrentList();
  title.textContent = list[index].title;
  audio.src = list[index].url;
  document.title = list[index].title + " - Now Playing";
  document.body.style.backgroundImage = list[index].background || 'none';
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundPosition = 'center';

  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: list[index].title,
      artist: 'Simple Music Player',
      album: '',
      artwork: [
        { src: 'https://cdn-icons-png.flaticon.com/512/727/727245.png', sizes: '512x512', type: 'image/png' }
      ]
    });

    navigator.mediaSession.setActionHandler('play', () => {
      audio.play();
      playBtn.textContent = '⏸️';
    });

    navigator.mediaSession.setActionHandler('pause', () => {
      audio.pause();
      playBtn.textContent = '▶️';
    });

    navigator.mediaSession.setActionHandler('previoustrack', () => {
      prevSong();
    });

    navigator.mediaSession.setActionHandler('nexttrack', () => {
      nextSong();
    });

    // Only position state — no seekforward/backward handlers
    if (navigator.mediaSession.setPositionState) {
      navigator.mediaSession.setPositionState({
        duration: audio.duration || 0,
        playbackRate: audio.playbackRate || 1,
        position: audio.currentTime || 0
      });
    }
  }
}

function playSong(index) {
  current = index;
  loadSong(current);
  audio.play();
  playBtn.textContent = '⏸️';
}

function nextSong() {
  const list = getCurrentList();
  current = (current + 1) % list.length;
  playSong(current);
}

function prevSong() {
  const list = getCurrentList();
  current = (current - 1 + list.length) % list.length;
  playSong(current);
}

playBtn.onclick = () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = '⏸️';
  } else {
    audio.pause();
    playBtn.textContent = '▶️';
  }
};

nextBtn.onclick = nextSong;
prevBtn.onclick = prevSong;

shuffleBtn.onclick = () => {
  isShuffling = !isShuffling;
  if (isShuffling) {
    shuffledList = shuffleArray([...songs]);
    current = 0;
    playSong(current);
    shuffleBtn.style.color = 'limegreen';
  } else {
    current = 0;
    playSong(current);
    shuffleBtn.style.color = 'white';
  }
};

audio.addEventListener('ended', nextSong);

audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;

    // Keep updating position state for seeking in media panel
    if ('mediaSession' in navigator && navigator.mediaSession.setPositionState) {
      navigator.mediaSession.setPositionState({
        duration: audio.duration,
        playbackRate: audio.playbackRate,
        position: audio.currentTime
      });
    }
  }
});

progress.addEventListener('input', () => {
  if (audio.duration) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});

// Load first song
loadSong(current);
