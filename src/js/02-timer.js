import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';
const startButton = document.querySelector('[data-start]');

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
let selectedDate = document.querySelector('input#datetime-picker');
let intervalId = null;

startButton.setAttribute('disabled', true);

startButton.addEventListener('click', counterStart);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startButton.setAttribute('disabled', true);
    }
    startButton.removeAttribute('disabled', '');
  },
};

flatpickr('#datetime-picker', options);

function counterStart() {
  startButton.setAttribute('disabled', true);
  intervalId = setInterval(() => {
    const getTimeComponents =
      new Date(selectedDate.value).getTime() - new Date().getTime();

    const { days, hours, minutes, seconds } = convertMs(getTimeComponents);

    daysEl.innerHTML = days < 10 ? addLeadingZero(days) : days;
    hoursEl.innerHTML = hours < 10 ? addLeadingZero(hours) : hours;
    minutesEl.innerHTML = minutes < 10 ? addLeadingZero(minutes) : minutes;
    secondsEl.innerHTML = seconds < 10 ? addLeadingZero(seconds) : seconds;

    if (getTimeComponents < 1000) {
      Notiflix.Notify.success('Timer is Over!');
      clearInterval(intervalId);
      startButton.removeAttribute('disabled', '');
    }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
