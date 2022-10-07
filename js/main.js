const body = document.querySelector("body");
const loginForm = document.querySelector("#login-form");
const loginInput = loginForm.querySelector("input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";
const N_BGI = 12; // total number of background images
const BG_FOLDER = "img/";
const BG_PREFIX = "bg";
const BG_EXT = "jpg";
const MORNING_START = 5;
const AFTERNOON_START = 12;
const EVENING_START = 17;

// Set random background images
bgImgFileName = `${BG_FOLDER}${BG_PREFIX}${Math.floor(
  Math.random() * N_BGI
)}.${BG_EXT}`;
body.style.backgroundImage = "url('" + bgImgFileName + "')";

// Get username from the log-in form
function onLoginSubmit(e) {
  e.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  displayGreeting(username);
}

// Show username
// Customize greeting message according to the time of the day
function displayGreeting(username) {
  const now = new Date();
  const hour = now.getHours();
  const greetingMessage = getGreetingMessage(hour);

  greeting.innerHTML = `${greetingMessage}, ${username}.`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
}

function getGreetingMessage(hour) {
  if (hour < MORNING_START || hour >= EVENING_START) {
    return "Good evening";
  } else if (hour >= MORNING_START && hour < AFTERNOON_START) {
    return "Good morning";
  } else {
    return "Good afternoon";
  }
}

// Get saved username and show
const savedUserName = localStorage.getItem(USERNAME_KEY);

if (savedUserName === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  displayGreeting(savedUserName);
}

// 추가할 기능
// 1. Geolocation & weather
// 2. timerId
// 3. 검색창
// 4. WorldClock & weather
// 5. CSS 꾸미기
