const api = {
    key: '9e122cd782b2d0333f5fe4e7fa192062',
    url: `https://api.openweathermap.org/data/2.5/weather`
  }
  
  const card = document.getElementById('card')
  
  const city = document.getElementById('city');
  const date = document.getElementById('date');
  const tempImg = document.getElementById('temp-img');
  const temp = document.getElementById('temp');
  const weather = document.getElementById('weather');
  const range = document.getElementById('range');
  
  function updateImages(data) {
    const temp = toCelsius(data.main.temp);
    let src = 'images/temp-normal.png';
    if (temp > 26) {
      src = 'images/alta-temp.png';
    } else if (temp < 20) {
      src = 'images/baja-temp.png';
    }
    tempImg.src = src;
  }
  
  async function search(query) {
    try {
      const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`);
      const data = await response.json();
      card.style.display = 'block';
      city.innerHTML = `${data.name}, ${data.sys.country}`;
      date.innerHTML = (new Date()).toLocaleDateString();
      temp.innerHTML = `${toCelsius(data.main.temp)}ºC`;
      weather.innerHTML = `${capitalize(data.weather[0].description)}`;
      range.innerHTML = `Mínima: ${toCelsius(data.main.temp_min)}ºC | Máxima: ${toCelsius(data.main.temp_max)}ºC`;
      updateImages(data);
    } catch (err) {
      console.log(err);
      alert('No se encontro la ciudad');
    }
  }

  function capitalize(texto) {
    var incial = texto.charAt(0).toUpperCase();
    var resto = texto.substring(1);
    var final = incial.concat(resto);
    return final;
  }
  
  function toCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
  }
  
  function onSubmit(event) {
    event.preventDefault();
    search(searchbox.value);
  }
  
  const searchform = document.getElementById('search-form');
  const searchbox = document.getElementById('searchbox');
  searchform.addEventListener('submit', onSubmit, true);
