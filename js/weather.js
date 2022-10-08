const city = document.querySelector("#weather span:first-child");
const weather = document.querySelector("#weather span:last-child");
const API_KEY = "f899f6a9ec558ddfe8fad14425c8c403";

// get current location and weather
navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoErr);

function onGeoSuccess(pos) {
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      city.innerText = data.name;
      weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
    });
}
function onGeoErr(error) {
  alert("Geolocation not available");
}
