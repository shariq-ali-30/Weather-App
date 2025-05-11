let apiKey = 'b4337d0fa325bbae2f444eca1409998b';
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?&units=metric`;
let search = document.querySelector('.search');
let weatherIcon = document.getElementById('weatherIcon');
let errorMessage = document.querySelector('.error-message')
let description = document.querySelector('.description');
let weatherDetails = document.querySelector('.weather-details');
let searchInput = document.querySelector('.search input');
let loadingText = document.querySelector('.loading-text');

async function getWeather(cityName) {
  const url = apiUrl + '&q=' + cityName + '&appid=' + apiKey;

  try {
    let response = await fetch(url);
    let data = await response.json();

    if (data.cod == '404') {
      errorMessage.innerText = 'City not found. Please try again.';
      errorMessage.style.display = 'block';
      searchInput.style.border = '1.5px solid red';
      weatherDetails.style.display = 'none';
      loadingText.style.display = 'none';
      return;
    }

    document.querySelector('.temp h1').innerText = Math.round(data.main.temp) + '°C';
    document.querySelector('.temp h2').innerText = data.name;
    document.querySelector('.humidity').innerText = data.main.humidity + '%';
    document.querySelector('.wind').innerText = data.wind.speed + ' km/h';

    let weatherMain = data.weather[0].main.toLowerCase();
    let weatherDesc = data.weather[0].description.toLowerCase();

    if (weatherMain === 'clear') {
      weatherIcon.src = 'clear.png';
      description.innerText = 'Sunny';

    } else if (weatherMain === 'clouds') {
      if (weatherDesc.includes('few')) {
        weatherIcon.src = 'few-clouds.png';
        description.innerText = 'Partly cloudy';
      } else if (weatherDesc.includes('scattered') || weatherDesc.includes('broken')) {
        weatherIcon.src = 'broken-clouds.png';
        description.innerText = 'Partly cloudy';
      } else {
        weatherIcon.src = 'clouds.png';
        description.innerText = 'Cloudy';
      }

    } else if (weatherMain === 'drizzle') {
      weatherIcon.src = 'drizzle.png';
      description.innerText = 'Drizzle';

    } else if (weatherMain === 'rain') {
      weatherIcon.src = 'rain.png';
      description.innerText = 'Rain';

    } else if (weatherMain === 'thunderstorm') {
      weatherIcon.src = 'thunder.png';
      description.innerText = 'Thunderstorm';

    } else if (weatherMain === 'snow') {
      weatherIcon.src = 'snow.png';
      description.innerText = 'Snow';

    } else if (
      weatherMain === 'mist' ||
      weatherMain === 'smoke' ||
      weatherMain === 'haze' ||
      weatherMain === 'fog'
    ) {
      weatherIcon.src = 'clouds.png';
      description.innerText = 'Fog';

    } else {
      weatherIcon.src = 'clear.png';
      description.innerText = 'Sunny';
    }

  } catch (error) {
    errorMessage.innerText = 'Unable to fetch data. Please check your connection.';
    errorMessage.style.display = 'block';
    searchInput.style.border = '1.5px solid red';
    weatherDetails.style.display = 'none';
    loadingText.style.display = 'none';
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
    weatherDetails.style.display = 'none';
    loadingText.style.display = 'none';
    return;
  } else {
    setTimeout(() => {
      weatherDetails.style.display = 'block';
      loadingText.style.display = 'none';
    }, 3000);

    getWeather(cityName);

    errorMessage.style.display = 'none';
    searchInput.style.border = 'none';
    loadingText.style.display = 'block';
    weatherDetails.style.display = 'none';

searchInput.blur();
  }
});