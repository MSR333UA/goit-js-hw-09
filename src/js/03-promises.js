import Notiflix from 'notiflix';

const formClassEl = document.querySelector('.form');
formClassEl.addEventListener('submit', onButtonSubmit);

function onButtonSubmit(event) {
  event.preventDefault();
  const { delay, step, amount } = event.currentTarget;

  let delayFirst = Number(delay.value);
  const stepDelay = Number(step.value);
  const amountNumber = Number(amount.value);

  for (let i = 1; i <= amountNumber; i += 1) {
    createPromise(i, delayFirst);
    delayFirst += stepDelay;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  promise
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
