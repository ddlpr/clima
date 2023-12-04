const api_key = '88f58c9268079e3201d24de9c4a44648';
const getWeather = async function (city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric&lang=es`;
  return fetch(url).then(response => response.json());
};

