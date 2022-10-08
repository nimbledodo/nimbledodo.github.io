const bAddMin = document.querySelector("#add-min");
const bSubMin = document.querySelector("#sub-min");
const bAddSec = document.querySelector("#add-sec");
const bSubSec = document.querySelector("#sub-sec");
const timeLeft = document.querySelector("#time-left");
const bStartStop = document.querySelector("#timer i");

const START_CLASS_NAME = "fa-play";
const PAUSE_CLASS_NAME = "fa-pause";

function addMin(e) {
  e.preventDefault();
  const curClassName = bStartStop.classList[1];
  if (curClassName !== PAUSE_CLASS_NAME) {
    const lastTimeLeft = timeLeft.innerText;
    let lastMin = parseInt(lastTimeLeft.substr(0, 2));
    if (lastMin < 60) {
      lastMin++;
    }
    timeLeft.innerText = `${String(lastMin).padStart(
      2,
      "0"
    )}${lastTimeLeft.substr(2, 3)}`;
  }
}

function subMin(e) {
  e.preventDefault();
  const curClassName = bStartStop.classList[1];
  if (curClassName !== PAUSE_CLASS_NAME) {
    const lastTimeLeft = timeLeft.innerText;
    let lastMin = parseInt(lastTimeLeft.substr(0, 2));
    if (lastMin > 0) {
      lastMin--;
    }
    timeLeft.innerText = `${String(lastMin).padStart(
      2,
      "0"
    )}${lastTimeLeft.substr(2, 3)}`;
  }
}

function addSec(e) {
  e.preventDefault();
  const curClassName = bStartStop.classList[1];
  if (curClassName !== PAUSE_CLASS_NAME) {
    const lastTimeLeft = timeLeft.innerText;
    let lastSec = parseInt(lastTimeLeft.substr(3, 2));
    if (lastSec < 60) {
      lastSec++;
    }
    timeLeft.innerText = `${lastTimeLeft.substr(0, 3)}${String(
      lastSec
    ).padStart(2, "0")}`;
  }
}
function subSec(e) {
  e.preventDefault();
  const curClassName = bStartStop.classList[1];
  if (curClassName !== PAUSE_CLASS_NAME) {
    const lastTimeLeft = timeLeft.innerText;
    let lastSec = parseInt(lastTimeLeft.substr(3, 2));
    if (lastSec > 0) {
      lastSec--;
    }
    timeLeft.innerText = `${lastTimeLeft.substr(0, 3)}${String(
      lastSec
    ).padStart(2, "0")}`;
  }
}

function onITagClick(e) {
  const curClassName = bStartStop.classList[1];
  if (curClassName === START_CLASS_NAME) {
    // Now we need to start the timer
    bStartStop.classList.add(PAUSE_CLASS_NAME);
    bStartStop.classList.remove(START_CLASS_NAME);
    const timerId = setInterval(function () {
      const timeLeftText = timeLeft.innerText;
      const min = parseInt(timeLeftText.substr(0, 2));
      const sec = parseInt(timeLeftText.substr(3, 2));
      let time = min * 60 + sec;
      time--;
      if (bStartStop.classList[1] === START_CLASS_NAME) {
        clearInterval(timerId);
      } else if (time <= 0) {
        // timer ended
        clearInterval(timerId);
        bStartStop.classList.add(START_CLASS_NAME);
        bStartStop.classList.remove(PAUSE_CLASS_NAME);
        timeLeft.innerText = "00:00";
      } else {
        //show timer text
        timeLeft.innerText = `${String(parseInt(time / 60)).padStart(
          2,
          "0"
        )}:${String(time % 60).padStart(2, "0")}`;
      }
    }, 1000);
  } else {
    // user clicked pause
    bStartStop.classList.add(START_CLASS_NAME);
    bStartStop.classList.remove(PAUSE_CLASS_NAME);
  }
}

bAddMin.addEventListener("click", addMin);
bSubMin.addEventListener("click", subMin);
bAddSec.addEventListener("click", addSec);
bSubSec.addEventListener("click", subSec);
bStartStop.addEventListener("click", onITagClick);
