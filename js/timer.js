const bAddMin = document.querySelector("#add-min");
const bSubMin = document.querySelector("#sub-min");
const bAddSec = document.querySelector("#add-sec");
const bSubSec = document.querySelector("#sub-sec");
const timeLeft = document.querySelector("#time-left");
const bStartStop = document.querySelector("#timer i");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let time = 0;
let targetTime = 0;

const START_CLASS_NAME = "fa-play";
const PAUSE_CLASS_NAME = "fa-pause";

function addMin(e) {
  e.preventDefault();
  const curClassName = bStartStop.classList[1];
  if (curClassName !== PAUSE_CLASS_NAME && time === 0) {
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
  if (curClassName !== PAUSE_CLASS_NAME && time === 0) {
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
  if (curClassName !== PAUSE_CLASS_NAME && time === 0) {
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
  if (curClassName !== PAUSE_CLASS_NAME && time === 0) {
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

function drawArc(rate, color) {
  let angle = 0;
  if (rate <= 0.25) {
    angle = (1.5 + rate * 2.0) * Math.PI;
  } else {
    angle = (-0.5 + rate * 2.0) * Math.PI;
  }
  console.log("angle", angle);
  ctx.beginPath();
  ctx.arc(105, 105, 100, 1.5 * Math.PI, angle, false);
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.stroke();
  //ctx.closePath();
}

function drawBaseCircle() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(105, 105, 100, -Math.PI, 2 * Math.PI, false);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();
}

function onITagClick(e) {
  const curClassName = bStartStop.classList[1];
  const timeLeftText = timeLeft.innerText;
  if (curClassName === START_CLASS_NAME && timeLeft.innerText !== "00:00") {
    // Now we need to start the timer
    bStartStop.classList.add(PAUSE_CLASS_NAME);
    bStartStop.classList.remove(START_CLASS_NAME);
    const min = parseInt(timeLeftText.substr(0, 2));
    const sec = parseInt(timeLeftText.substr(3, 2));
    time = (min * 60 + sec) * 10; // in 0.1s
    const targetTime = time;
    const timerId = setInterval(function () {
      let rate = (targetTime - time) / targetTime;
      drawArc(rate, "white");
      time--;
      if (bStartStop.classList[1] === START_CLASS_NAME) {
        clearInterval(timerId);
      } else if (time <= 0) {
        // drawArc(1, "white");
        // timer ended
        clearInterval(timerId);
        bStartStop.classList.add(START_CLASS_NAME);
        bStartStop.classList.remove(PAUSE_CLASS_NAME);
        timeLeft.innerText = "00:00";
        time = 0;
        drawBaseCircle();
      } else {
        //show timer text
        timeLeft.innerText = `${String(
          parseInt(Math.ceil(time / 10) / 60)
        ).padStart(2, "0")}:${String(
          parseInt(Math.ceil(time / 10) % 60)
        ).padStart(2, "0")}`;
      }
    }, 100);
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

drawBaseCircle();
