let currentAudio = null;
let currentBtn = null;

const playerBar = document.getElementById('playerBar');
const playerTitle = document.getElementById('playerTitle');
const togglePlayBtn = document.getElementById('togglePlayBtn');

document.querySelectorAll('.play-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const audioSrc = btn.getAttribute('data-audio');
    const card = btn.closest('.card');
    const title = card.querySelector('h3').innerText + ' – ' + card.querySelector('.track-title').innerText;

    if (currentAudio && currentBtn === btn) {
      if (currentAudio.paused) {
        currentAudio.play();
        btn.querySelector('.icon-play').innerText = '⏸';
        togglePlayBtn.innerText = '⏸ Pause';
      } else {
        currentAudio.pause();
        btn.querySelector('.icon-play').innerText = '▶';
        togglePlayBtn.innerText = '▶ Weiter';
      }
      return;
    }

    if (currentAudio) {
      currentAudio.pause();
      if (currentBtn) currentBtn.querySelector('.icon-play').innerText = '▶';
    }

    currentAudio = new Audio(audioSrc);
    currentBtn = btn;
    btn.querySelector('.icon-play').innerText = '⏸';

    playerBar.style.display = 'block';
    playerTitle.innerText = title;
    togglePlayBtn.innerText = '⏸ Pause';

    currentAudio.play();

    currentAudio.onended = () => {
      btn.querySelector('.icon-play').innerText = '▶';
      togglePlayBtn.innerText = '▶ Neu abspielen';
    };
  });
});

togglePlayBtn.addEventListener('click', () => {
  if (!currentAudio) return;
  if (currentAudio.paused) {
    currentAudio.play();
    if (currentBtn) currentBtn.querySelector('.icon-play').innerText = '⏸';
    togglePlayBtn.innerText = '⏸ Pause';
  } else {
    currentAudio.pause();
    if (currentBtn) currentBtn.querySelector('.icon-play').innerText = '▶';
    togglePlayBtn.innerText = '▶ Weiter';
  }
});
