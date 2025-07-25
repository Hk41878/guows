const songs = [
  { title: "Track 1", url: "https://guows.com/songs/mp3/anuvjain/music1.mp3" },
  { title: "Track 2", url: "https://guows.com/songs/mp3/anuvjain/music2.mp3" },
  { title: "Track 3", url: "https://guows.com/songs/mp3/anuvjain/music3.mp3" },
  { title: "Track 4", url: "https://guows.com/songs/mp3/anuvjain/music4.mp3" },
  { title: "Track 5", url: "https://guows.com/songs/mp3/anuvjain/music5.mp3" },
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
  document.title = list[index].title + " ";
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
  }
});

progress.addEventListener('input', () => {
  if (audio.duration) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});

// Load first song
loadSong(current);
