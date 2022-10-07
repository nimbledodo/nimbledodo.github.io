const clock = document.querySelector("#clock span");

function setClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = now.getSeconds();
  clock.innerText = `${hours}:${minutes}`;
  return seconds;
}

//Initially refresh every one second
const initSec = setClock();
let timerId = setInterval(setClock, 1000);
setTimeout(() => {
  clearInterval(timerId);
}, (60 - initSec) * 1000);
//Afterward refresh every ten seconds
setInterval(setClock, 1000 * 10);
