const timeLabel = document.getElementById('time');
const startBtn = document.getElementById('start-btn');
const lapBtn = document.getElementById('lap-btn');
const lapList = document.getElementById('laps');

let elapsed = 0;
let startedAt = 0;
let intervalId = null;
let lapCount = 0;

function pad(n) {
  return String(n).padStart(2, '0');
}

function formatTime(ms) {
  const centis = Math.floor(ms / 10) % 100;
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / 60000);
  return pad(minutes) + ':' + pad(seconds) + ':' + pad(centis);
}

function currentTime() {
  return intervalId === null ? elapsed : Date.now() - startedAt;
}

function updateDisplay() {
  timeLabel.textContent = formatTime(currentTime());
}

function start() {
  startedAt = Date.now() - elapsed;
  intervalId = setInterval(updateDisplay, 10);
  startBtn.textContent = 'Stop';
  startBtn.classList.add('running');
  lapBtn.textContent = 'Lap';
  lapBtn.disabled = false;
}

function stop() {
  elapsed = Date.now() - startedAt;
  clearInterval(intervalId);
  intervalId = null;
  updateDisplay();
  startBtn.textContent = 'Start';
  startBtn.classList.remove('running');
  lapBtn.textContent = 'Reset';
}

function reset() {
  elapsed = 0;
  lapCount = 0;
  lapList.innerHTML = '';
  updateDisplay();
  lapBtn.textContent = 'Lap';
  lapBtn.disabled = true;
}

function addLap() {
  lapCount += 1;

  const li = document.createElement('li');

  const name = document.createElement('span');
  name.textContent = 'Lap ' + lapCount;

  const time = document.createElement('span');
  time.className = 'lap-time';
  time.textContent = formatTime(currentTime());

  li.appendChild(name);
  li.appendChild(time);
  lapList.prepend(li);
}

startBtn.addEventListener('click', function () {
  if (intervalId === null) {
    start();
  } else {
    stop();
  }
});

lapBtn.addEventListener('click', function () {
  if (intervalId !== null) {
    addLap();
  } else {
    reset();
  }
});
