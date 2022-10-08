const city = document.querySelector("#weather span:last-child");
const weatherIcon = document.querySelector("#weather img");
const temp = document.querySelector("#weather span:first-of-type");
const API_KEY = config.apikey;

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
      weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      weatherIcon.alt = data.weather[0].main;
      // weatherIcon.innerText = getWeatherIcon();
      temp.innerText = `${Math.ceil(data.main.temp)}°`;
    });
}
function onGeoErr(error) {
  alert("Geolocation not available");
}
