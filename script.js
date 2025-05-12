let apiKey = 'ad892631403849b0a2191654251205';

let search = document.querySelector('.search');
let weatherIcon = document.getElementById('weatherIcon');
let errorMessage = document.querySelector('.error-message');
let description = document.querySelector('.description');
let weatherDetails = document.querySelector('.weather-details');
let searchInput = document.querySelector('.search input');
let loadingText = document.querySelector('.loading-text');

async function getWeather(cityName) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`;

  try {
    let response = await fetch(url);
    let data = await response.json();

    if (data.error) {
  errorMessage.innerText = data.error.message || 'City not found. Please try again.';
  errorMessage.style.display = 'block';
  searchInput.style.border = '1.5px solid red';
  weatherDetails.style.display = 'none';
  loadingText.style.display = 'none';
  return;
}

    document.querySelector('.temp h1').innerText = Math.round(data.current.temp_c) + '°C';
document.querySelector('.temp h2').innerText = data.location.name;
document.querySelector('.humidity').innerText = data.current.humidity + '%';
document.querySelector('.wind').innerText = data.current.wind_kph + ' km/h';

    description.innerText = data.current.condition.text;
weatherIcon.src = "https:" + data.current.condition.icon;

    setTimeout(() => {
      weatherDetails.style.display = 'block';
      loadingText.style.display = 'none';
    }, 3000);

  } catch (error) {
    errorMessage.innerText = 'Unable to fetch data. Please check your internet connection.';
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
    errorMessage.style.display = 'none';
    searchInput.style.border = 'none';
    weatherDetails.style.display = 'none';
    loadingText.style.display = 'block';
    getWeather(cityName);
    searchInput.blur();
  }
});