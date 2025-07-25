const songs = [
  { title: "Track 1", url: "https://guows.com/songs/mp3/anuvjain/music1.mp3" },
  { title: "Track 2", url: "https://guows.com/songs/mp3/anuvjain/music2.mp3" },
  { title: "Track 3", url: "https://guows.com/songs/mp3/anuvjain/music3.mp3" },
  { title: "Track 4", url: "https://guows.com/songs/mp3/anuvjain/music4.mp3" },
  { title: "Track 5", url: "https://guows.com/songs/mp3/anuvjain/music5.mp3" },
];

let current = 0;
let isShuffling = false;

const title = document.getElementById('title');
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const progress = document.getElementById('progress');
const shuffleBtn = document.getElementById('shuffle');

function loadSong(index) {
  title.textContent = songs[index].title;
  audio.src = songs[index].url;
}

function playCurrentSong() {
  loadSong(current);
  audio.play();
  playBtn.textContent = '⏸️';
}

function getNextIndex() {
  if (isShuffling) {
    let next;
    do {
      next = Math.floor(Math.random() * songs.length);
    } while (next === current && songs.length > 1);
    return next;
  }
  return (current + 1) % songs.length;
}

function getPrevIndex() {
  return (current - 1 + songs.length) % songs.length;
}

// Initial load
loadSong(current);

playBtn.onclick = () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = '⏸️';
  } else {
    audio.pause();
    playBtn.textContent = '▶️';
  }
};

nextBtn.onclick = () => {
  current = getNextIndex();
  playCurrentSong();
};

prevBtn.onclick = () => {
  current = getPrevIndex();
  playCurrentSong();
};

shuffleBtn.onclick = () => {
  isShuffling = !isShuffling;
  shuffleBtn.style.color = isShuffling ? 'limegreen' : 'white';
};

audio.addEventListener('ended', () => {
  current = getNextIndex();
  playCurrentSong();
});

audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
  }
});

progress.addEventListener('input', () => {
  if (audio.duration) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});
