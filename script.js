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
  "1-Clear": "clear_day.png",
  "0-Clear": "clear_night.png",
  "1-Partly cloudy": "partly_cloudy_day.png",
  "0-Partly cloudy": "partly_cloudy_night.png",
  "1-Rain": "rain.png",
  "0-Rain": "rain.png",
  "1-Patchy rain possible": "patchy_rain_possible_day.png",
  "0-Patchy rain possible": "patchy_rain_possible_night.png",
  "1-Fog": "fog.png",
  "0-Fog": "fog.png",
  "1-Mist": "mist.png",
  "0-Mist": "mist.png",
  "1-Overcast": "overcast.png",
  "0-Overcast": "overcast.png",
  "1-Thunder": "thunder_day.png",
  "0-Thunder": "thunder_night.png",
  "1-Snow_rain": "snow_rain_day.png",
  "0-Snow_rain": "snow_rain_night.png",
  "1-Snow": "snow_day.png",
  "0-Snow": "snow_night.png",
  "1-Cloudy": "cloudy_day.png",
  "0-Cloudy": "cloudy_night.png"
};

function getWeatherIcon(data) {
  const key = `${data.current.is_day}-${data.current.condition.text}`;
  return iconMap[key] || "https:" + data.current.condition.icon;
}
getWeatherIcon(data)
    setTimeout(() => {
      weatherDetails.style.display = 'block';
      loader.style.display = 'none';
    }, 1500);

  } catch (error) {
    errorMessage.innerText = 'Unable to fetch data. Please check your internet connection.';
    errorMessage.style.display = 'block';
    searchInput.style.border = '1.5px solid red';
    searchInput.focus();
    weatherDetails.style.display = 'none';
    loader.style.display = 'none';
    console.error('Fetch error:', error);
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