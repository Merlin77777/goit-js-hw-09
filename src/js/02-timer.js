import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const buttonStart = document.querySelector('button[data-start]');
buttonStart.addEventListener('click', onStart);
buttonStart.disabled = true;

const input = document.querySelector('#datetime-picker');

let timerId = null;
let currentDate = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0].getTime() < currentDate.getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      buttonStart.disabled = true;
    } else {
      buttonStart.disabled = false;
    }
  },
};

const fp = flatpickr('#datetime-picker', options);

function onStart() {
  buttonStart.disabled = true;
  input.disabled = true;
  currentDate = new Date();
  let diffDate = fp.selectedDates[0].getTime() - currentDate.getTime();

  timerId = setInterval(() => {
    const timer = convertMs(diffDate);
    const spanDays = document.querySelector('span[data-days]');
    const spanHours = document.querySelector('span[data-hours]');
    const spanMinutes = document.querySelector('span[data-minutes]');
    const spanSeconds = document.querySelector('span[data-seconds]');

    spanDays.textContent = addLeadingZero(timer.days);
    spanHours.textContent = addLeadingZero(timer.hours);
    spanMinutes.textContent = addLeadingZero(timer.minutes);
    spanSeconds.textContent = addLeadingZero(timer.seconds);
    diffDate -= 1000;
    if (
      timer.days === 0 &&
      timer.hours === 0 &&
      timer.minutes === 0 &&
      timer.seconds === 0
    ) {
      input.disabled = false;
      clearInterval(timerId);
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
