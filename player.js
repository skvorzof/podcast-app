import './player.css';

export const player = () => {
  const songInfo = document.querySelector('.song-info');
  const songDuration = document.querySelector('.song-duration');
  const progressContainer = document.querySelector('.progress-container');
  const progress = document.querySelector('.progress');
  const audio = document.querySelector('audio');

  const btnPlay = document.querySelector('#btn-play');
  btnPlay.addEventListener('click', playPause);

  const btnPrev = document.querySelector('#btn-prev');
  btnPrev.addEventListener('click', playPrev);

  const btnNext = document.querySelector('#btn-next');
  btnNext.addEventListener('click', playNext);

  const songs = ['bigway', 'speak', 'frends'];
  let songIndex = 0;

  // Initial load song info
  loadSong(songs[songIndex]);

  function loadSong(song) {
    songInfo.innerText = song;
    audio.src = `media/${song}.mp3`;
  }

  function playPrev() {
    songIndex--;
    if (songIndex < 0) songIndex = songs.length - 1;
    loadSong(songs[songIndex]);
    playSong();
  }

  function playNext() {
    songIndex++;
    if (songIndex > songs.length - 1) songIndex = 0;
    loadSong(songs[songIndex]);
    playSong();
  }

  function playSong() {
    audio.play();
  }

  function pauseSong() {
    audio.pause();
  }

  function playPause() {
    audio.paused ? playSong() : pauseSong();
  }

  function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.clientX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
  }

  function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    songDuration.innerText = Math.round(currentTime) + ' sec';
  }

  audio.addEventListener('timeupdate', updateProgress);
  audio.addEventListener('ended', playNext);
  progressContainer.addEventListener('click', setProgress);
};

export const playerContainer = `<div class="player-container">
    <div class="song-info"></div>
    <div class="song-duration"></div>
    <div class="progress-container">
        <div class="progress"></div>
    </div>
    <audio></audio>
    <button class="btn" id="btn-prev">◀️</button>
    <button class="btn" id="btn-play">⏯</button>
    <button class="btn" id="btn-next">▶️</button>
</div>`;
