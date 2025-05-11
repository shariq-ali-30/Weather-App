let apiKey = 'b4337d0fa325bbae2f444eca1409998b';
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?&units=metric`;
let search = document.querySelector('.search');
let weatherIcon = document.getElementById('weatherIcon');
let errorMessage = document.querySelector('.error-message');
let description = document.querySelector('.description');

async function getWeather(cityName) {

  const url = apiUrl + '&q=' + cityName + '&appid=' + apiKey;
  let response = await fetch(url);
  let data = await response.json();

  if (data.cod == '404') {
    errorMessage.innerText = 'City not found. Please try again.';
    errorMessage.style.display = 'block';
    document.querySelector('.search input').style.border = '1.5px solid red';
    document.querySelector('.weather-details').style.display = 'none';

document.querySelector('.search input').value = 'cityName'

return;
  }

  document.querySelector('.temp h1').innerText = Math.round(data.main.temp) + '°C';
  document.querySelector('.temp h2').innerText = data.name;
  document.querySelector('.humidity').innerText = data.main.humidity + '%';
  document.querySelector('.wind').innerText = data.wind.speed + ' km/h';

  if (data.weather[0].main === 'Clear') {
    weatherIcon.src = 'clear.png';
    description.innerText = 'Sunny';
  } else if (data.weather[0].main === 'Clouds') {
    weatherIcon.src = 'clouds.png';
    description.innerText = 'Cloudy';
  } else if (data.weather[0].main === 'Few clouds') {
    weatherIcon.src = 'few-clouds.png';
    description.innerText = 'Partly cloudy';
  } else if (data.weather[0].main === 'Scattered clouds') {
    weatherIcon.src = 'broken-clouds.png';
    description.innerText = 'Partly cloudy';
  } else if (data.weather[0].main === 'Broken clouds') {
    weatherIcon.src = 'broken-clouds.png';
    description.innerText = 'Partly cloudy';
  } else if (data.weather[0].main === 'Drizzle') {
    weatherIcon.src = 'drizzle.png';
    description.innerText = 'Drizzle';
  } else if (data.weather[0].main === 'Rain') {
    weatherIcon.src = 'rain.png';
    description.innerText = 'Rain';
  } else if (data.weather[0].main === 'Thunderstorm') {
    weatherIcon.src = 'thunder.png';
    description.innerText = 'Thunderstorm';
  } else if (data.weather[0].main === 'Snow') {
    weatherIcon.src = 'snow.png';
    description.innerText = 'Snow';
  } else if (
    data.weather[0].main === 'Mist' ||
    data.weather[0].main === 'Smoke' ||
    data.weather[0].main === 'Haze' ||
    data.weather[0].main === 'Fog'
  ) {
    weatherIcon.src = 'clouds.png';
    description.innerText = 'Fog';
  } else {
    weatherIcon.src = 'clear.png';
    description.innerText = 'Sunny';
  }
}

search.addEventListener('submit', (event) => {
  event.preventDefault();
  let cityName = document.querySelector('.search input').value.trim();


  if (cityName === '') {
    errorMessage.innerText = 'Please enter a city name.';
    errorMessage.style.display = 'block';
    document.querySelector('.search input').style.border = '1.5px solid red';
    document.querySelector('.weather-details').style.display = 'none';
    document.querySelector('.loading-text').style.display = 'none';
    clearTimeout();
    return;
  } else {
    setTimeout(() => {
      getWeather(cityName);
      document.querySelector('.weather-details').style.display = 'block';
      document.querySelector('.loading-text').style.display = 'none';
    }, 3000);

    errorMessage.style.display = 'none';
    document.querySelector('.search input').style.border = 'none';
    document.querySelector('.loading-text').style.display = 'block';
    document.querySelector('.weather-details').style.display = 'none';

document.querySelector('.search input').blur();
  }
});