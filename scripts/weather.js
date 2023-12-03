const mostrar_datos = function (data) {

  const msj_clima = document.getElementById('clima_msg');
  const msj_desc = document.getElementById('desc');
  const temperatura = data.main.temp;
  const desc = data.weather[0].description;

  msj_clima.innerHTML = temperatura;
  msj_desc.innerHTML = desc;
};
const carga_clima = function () {
  const api_key = '88f58c9268079e3201d24de9c4a44648';
  let ciudad = 'Hermosillo';

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${api_key}&units=metric&lang=es`;

  fetch(url)
    .then(response => response.json())
    .then(data => mostrar_datos(data))
    .catch(error => {
      console.error('Algo salió mal', error);
    });
};

document.addEventListener('DOMContentLoaded', carga_clima);
let x = 10;

