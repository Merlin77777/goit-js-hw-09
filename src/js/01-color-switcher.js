const button_start = document.querySelector('button[data-start]');
button_start.addEventListener('click', onStart);

const button_stop = document.querySelector('button[data-stop]');
button_stop.addEventListener('click', onStop);
button_stop.disabled = true;

let timerId = null;

function onStart() {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  button_start.disabled = true;
  button_stop.disabled = false;
}

function onStop() {
  clearInterval(timerId);
  button_start.disabled = false;
  button_stop.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
