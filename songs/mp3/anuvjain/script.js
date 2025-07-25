// Replace these with your GitHub raw file links
const songs = [
  {
    title: "Track 1",
    url: "https://guows.com/songs/mp3/anuvjain/music1.mp3"
  },
  {
    title: "Track 2",
    url: "https://raw.githubusercontent.com/yourusername/yourrepo/main/music2.mp3"
  }
];

let current = 0;

const title = document.getElementById('title');
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const progress = document.getElementById('progress');

function loadSong(index) {
  title.textContent = songs[index].title;
  audio.src = songs[index].url;
  audio.load();
}
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
  current = (current + 1) % songs.length;
  loadSong(current);
  audio.play();
};

prevBtn.onclick = () => {
  current = (current - 1 + songs.length) % songs.length;
  loadSong(current);
  audio.play();
};

audio.addEventListener('timeupdate', () => {
  progress.value = (audio.currentTime / audio.duration) * 100;
});

progress.addEventListener('input', () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});
