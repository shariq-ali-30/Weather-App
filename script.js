let apiKey = 'ad892631403849b0a2191654251205';

let search = document.querySelector('.search');
let weatherIcon = document.getElementById('weatherIcon');
let errorMessage = document.querySelector('.error-message');
let description = document.querySelector('.description');
let weatherDetails = document.querySelector('.weather-details');
let searchInput = document.querySelector('.search input');
let loader = document.querySelector('.loader');

async function getWeather(cityName) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`;

  try {
    let response = await fetch(url);
    let data = await response.json();

    if (data.error) {
  errorMessage.innerText = data.error.message || 'City not found. Please try again.';
  errorMessage.style.display = 'block';
  searchInput.style.border = '1.5px solid red';
    searchInput.focus();
  weatherDetails.style.display = 'none';
  loader.style.display = 'none';
  return;
}

    document.querySelector('.temp h1').innerText = Math.round(data.current.temp_c) + '°C';
document.querySelector('.temp h2').innerText = data.location.name + ', ' + data.location.country;
document.querySelector('.humidity').innerText = data.current.humidity + '%';
document.querySelector('.wind').innerText = data.current.wind_kph + ' km/h';

    const iconMap = {
  "1-sunny": "clear_day.png",
  "0-sunny": "clear_day.png",
  "1-clear": "clear_day.png",
  "0-clear": "clear_night.png",
  "1-partly cloudy": "partly_cloudy_day.png",
  "0-partly cloudy": "partly_cloudy_night.png",
  "1-rain": "rain.png",
  "0-rain": "rain.png",
  "1-patchy rain nearby": "patchy_rain_nearby_day.png",
  "0-patchy rain nearby": "patchy_rain_nearby_night.png",
  "1-fog": "fog.png",
  "0-fog": "fog.png",
  "1-mist": "mist.png",
  "0-mist": "mist.png",
  "1-overcast": "overcast.png",
  "0-overcast": "overcast.png",
  "1-thundery outbreaks possible": "thundery_outbreaks_possible_day.png",
  "0-thundery outbreaks possible": "thundery_outbreaks_possible_night.png",
  "1-thundery outbreaks in nearby":
"thundery_outbreaks_possible_day.png",
  "0-thundery outbreaks in nearby":
"thundery_outbreaks_possible_night.png",
  "1-snow_rain": "snow_rain_day.png",
  "0-snow_rain": "snow_rain_night.png",
  "1-snow": "snow_day.png",
  "0-snow": "snow_night.png",
  "1-cloudy": "cloudy_day.png",
  "0-cloudy": "cloudy_night.png",
  "1-patchy snow possible": "patchy_snow_possible_day.png",
  "0-patchy snow possible": "patchy_snow_possible_night.png",
  "1-light rain": "light_rain.png",
  "0-light rain": "light_rain.png",
  "1-heavy rain": "heavy_rain.png",
  "0-heavy rain": "heavy_rain.png",
  "1-light snow": "light_snow_day.png",
  "0-light snow": "light_snow_night.png",
  "1-blizzard": "blizzard.png",
  "0-blizzard": "blizzard.png",
  "1-freezing fog": "freezing_fog.png",
  "0-freezing fog": "freezing_fog.png"
};

function getWeatherIcon(data) {
  const key = `${data.current.is_day}-${data.current.condition.text.toLowerCase()}`;
  return iconMap[key] || "https:" + data.current.condition.icon;
}

weatherIcon.src = getWeatherIcon(data);
description.innerText = data.current.condition.text;

setTimeout(function() {
    weatherDetails.style.display = "block";
    loader.style.display = 'none';
}, 800);

  } catch (error) {
    errorMessage.innerText = 'Unable to fetch data. Please check your internet connection.';
    errorMessage.style.display = 'block';
    searchInput.style.border = '1.5px solid red';
    searchInput.focus();
    weatherDetails.style.display = 'none';
    loader.style.display = 'none';
  }
}

search.addEventListener('submit', (event) => {
  event.preventDefault();
  let cityName = searchInput.value.trim();

  if (cityName === '') {
    errorMessage.innerText = 'Please enter a city name.';
    errorMessage.style.display = 'block';
    searchInput.style.border = '1.5px solid red';
    searchInput.focus();
    weatherDetails.style.display = 'none';
    loader.style.display = 'none';
    return;
  } else {
    errorMessage.style.display = 'none';
    searchInput.style.border = 'none';
    weatherDetails.style.display = 'none';
    loader.style.display = 'block';
    getWeather(cityName);
    searchInput.blur();
  }
});