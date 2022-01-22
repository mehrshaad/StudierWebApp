const timer = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  longBreakInterval: 4,
  sessions: 0,
};

let interval;

function getRemainingTime(endTime) {
  const currentTime = Date.parse(new Date());
  const difference = endTime - currentTime;

  const total = parseInt(difference / 1000);
  const minutes = parseInt((total / 60) % 60);
  const seconds = parseInt(total % 60);

  return {
    total,
    minutes,
    seconds,
  };
}

function updateClock() {
  const { remainingTime } = timer;
  const minutes = `${remainingTime.minutes}`.padStart(2, '0');
  const seconds = `${remainingTime.seconds}`.padStart(2, '0');

  const min = document.getElementById('js-minutes');
  const sec = document.getElementById('js-seconds');
  const time = `${minutes}:${seconds}`;
  min.textContent = minutes;
  sec.textContent = seconds;

  document.title = `${time} - Left`;
  // const progress = document.getElementById('js-progress');
  // progress.value = timer[timer.mode] * 60 - timer.remainingTime.total;
}

function startTimer() {
  let { total } = timer.remainingTime;
  const endTime = Date.parse(new Date()) + total * 1000;

  if (timer.mode === 'pomodoro') timer.sessions++;

  mainButton.dataset.action = 'stop';
  mainButton.classList.add('active');
  mainButton.classList.add('red');
  mainButton.textContent = 'stop';

  interval = setInterval(function () {
    timer.remainingTime = getRemainingTime(endTime);
    total = timer.remainingTime.total;
    updateClock();
    if (total <= 0) {
      stopTimer();
      clearInterval(interval);

      switch (timer.mode) {
        case 'pomodoro':
          if (timer.sessions % timer.longBreakInterval === 0) {
            switchMode('longBreak');
          } else {
            switchMode('shortBreak');
          }
          break;
        default:
          switchMode('pomodoro');
      }

      if (Notification.permission === 'granted') {
        const text =
          timer.mode === 'pomodoro' ? 'Get back to work!' : 'Take a break!';
        new Notification(text);
      }

      // document.querySelector(`[data-sound="${timer.mode}"]`).play();

    }
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
  mainButton.dataset.action = 'start';
  mainButton.classList.remove('active');
  mainButton.classList.remove('red');
  mainButton.textContent = 'start';
  postSearch(timer.remainingTime.total);
}


function switchMode(mode) {
  timer.mode = mode;
  timer.remainingTime = {
    total: timer[mode] * 60,
    minutes: timer[mode],
    seconds: 0,
  };

  document
    .querySelectorAll('button[data-mode]')
    .forEach(e => e.classList.remove('active'));
  document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
  // document
  //   .getElementById('js-progress')
  // .setAttribute('max', timer.remainingTime.total);
  document.body.style.backgroundColor = `var(--${mode})`;
  document.styleSheets[0]
  updateClock();


}

function handleMode(event) {
  const { mode } = event.target.dataset;

  if (!mode) return;

  timer.sessions = 0;
  switchMode(mode);
  stopTimer();

}

const buttonSound = new Audio();
const mainButton = document.getElementById('js-btn');
mainButton.addEventListener('click', () => {
  const { action } = mainButton.dataset;
  buttonSound.play();
  if (action === 'start') {
    startTimer();
  } else {
    stopTimer();
  }
});

const modeButtons = document.querySelector('#js-mode-buttons');
modeButtons.addEventListener('click', handleMode);

document.addEventListener('DOMContentLoaded', () => {
  if ('Notification' in window && Notification.permission !== 'denied') {
    Notification.requestPermission().then(function (permission) {
      if (permission === 'granted') {
        new Notification(
          'Awesome! You will receive notifications at the start of a pomodoro or a break'
        );
      }
    });
  }

  switchMode('pomodoro');
});
function postSearch(time = -1) {
  if (time == -1) {
    mode = timer.mode;
    timer.remainingTime = {
      total: timer[mode] * 60,
      minutes: timer[mode],
      seconds: 0,
    };
    updateClock();
  } if (timer.mode === 'pomodoro') {
    $.ajax({
      type: 'POST',
      url: '/pom/',
      data: {
        'selectedCourse': $('#course option:selected').text(),
        'time': time,
        'mode': timer.mode,
        'csrfmiddlewaretoken': CSRF_TOKEN,
      },
      success: function () {
        console.log("success");
      },
      error: function () {
        console.log("error");
      }
    })
  }
};