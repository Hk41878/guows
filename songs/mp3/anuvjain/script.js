const songs = [
  { title: "Track 1", url: "https://guows.com/songs/mp3/anuvjain/music1.mp3" },
  { title: "Track 2", url: "https://guows.com/songs/mp3/anuvjain/music2.mp3" },
  { title: "Track 3", url: "https://guows.com/songs/mp3/anuvjain/music3.mp3" },
  { title: "Track 4", url: "https://guows.com/songs/mp3/anuvjain/music4.mp3" },
  { title: "Track 5", url: "https://guows.com/songs/mp3/anuvjain/music5.mp3" },
];

let current = 0;
let isShuffling = false;
let playlist = [...songs]; // Will hold either normal or shuffled list

const title = document.getElementById('title');
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const progress = document.getElementById('progress');
const shuffleBtn = document.getElementById('shuffle');

function loadSong(index) {
  title.textContent = playlist[index].title;
  audio.src = playlist[index].url;
}

function playSong(index) {
  loadSong(index);
  audio.play();
  playBtn.textContent = '⏸️';
}

function nextSong() {
  current = (current + 1) % playlist.length;
  playSong(current);
}

function prevSong() {
  current = (current - 1 + playlist.length) % playlist.length;
  playSong(current);
}

// Initial load
loadSong(current);

// Controls
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
    playlist = shuffleArray([...songs]);
    shuffleBtn.style.color = 'limegreen';
  } else {
    playlist = [...songs];
    shuffleBtn.style.color = 'white';
  }

  current = 0;
  playSong(current);
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
