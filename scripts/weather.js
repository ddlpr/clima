const weatherFormButtonElement = document.querySelector('.weatherForm__btn');
const weatherFormInputElement = document.querySelector('.weatherForm__input');
const weatherCardElement = document.querySelector('.weatherCard');
const weatherCardImageElement = document.querySelector('.weatherCard__img');
const weatherCardTimeElement = document.querySelector('.weatherCard__time');
const weatherCardCityElement = document.querySelector('.weatherCard__city');
const weatherCardTempElement = document.querySelector('.weatherCard__temp');
const weatherCardDescElement = document.querySelector('.weatherCard__desc');
const weatherCardHumidityElement = document.querySelector('.weatherCard__humidity');
const weatherCardMinTempElement = document.querySelector('.weatherCard__temp-min');
const weatherCardMaxTempElement = document.querySelector('.weatherCard__temp-max');

const errorElement = document.querySelector('.error');
const errorCityElement = document.querySelector('.error__city');

const parseCityName = function (cityName) {
  return cityName
    .split(' ')
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ');
};

const displayWeather = function (data, city) {
  if (data.cod === '404') {
    weatherCardElement.classList.add('hidden');
    errorCityElement.textContent = parseCityName(city);
    errorElement.classList.remove('hidden');
  } else {
    const temperature = data.main.temp;
    const minTemp = data.main.temp_min;
    const maxTemp = data.main.temp_max;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const country = data.sys.country;

    console.log(data);
    const currentDate = new Date();
    const localTimeISOString = currentDate.toISOString();
    const startIndex = localTimeISOString.indexOf('T') + 1;
    const endIndex = localTimeISOString.indexOf('.');
    const localTime = localTimeISOString.slice(startIndex, endIndex);
    let hour = (Number(localTime.slice(0, 2)) + data.timezone / 60 / 60);
    if (hour < 0) hour += 24;
    if (hour >= 20 || hour <= 5) {
      weatherCardImageElement.textContent = '🌙';
      weatherCardElement.classList.add('weatherCard--dark');
    } else {
      weatherCardImageElement.textContent = '☀️';
      weatherCardElement.classList.remove('weatherCard--dark');
    }

    weatherCardTempElement.textContent = temperature;
    weatherCardDescElement.textContent = description.replace(description[0], description[0].toUpperCase());
    weatherCardHumidityElement.textContent = humidity;
    weatherCardMinTempElement.textContent = minTemp;
    weatherCardMaxTempElement.textContent = maxTemp;
    weatherCardCityElement.textContent = `${parseCityName(city)}, ${country}`;
    weatherCardTimeElement.textContent = `${hour.toString().padStart(2, '0')}${localTime.slice(2)} ${Number(hour) >= 12 ? 'PM' : 'AM'}`;

    weatherCardElement.classList.remove('hidden');
    errorElement.classList.add('hidden');
  }
};
const getWeather = function () {
  const api_key = '88f58c9268079e3201d24de9c4a44648';
  let city = weatherFormInputElement.value.toLowerCase();

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric&lang=es`;

  fetch(url)
    .then(response => response.json())
    .then(data => displayWeather(data, city))
    .catch(error => {
      console.error('Algo salió mal', error);
    });
};

weatherFormButtonElement.addEventListener('click', function () {
  getWeather();
  weatherFormInputElement.value = '';
});
