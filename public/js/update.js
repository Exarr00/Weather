const city = document.querySelector('.city');
const country = document.querySelector('.country');
const current_temp = document.getElementById('current-temp');
const max_temp = document.getElementById('max-temp');
const min_temp = document.getElementById('min-temp');
const current_time = document.querySelector('.current-time');
const country_flag = document.getElementById('flag');
const weather_icon = document.getElementById('weather-icon');
const feels_like = document.getElementById('feels-like');
const weather_main = document.getElementById('weather-main');
const weather_desc = document.getElementById('weather-desc');
const pressure = document.getElementById('pressure');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const forecast = document.querySelector('.forecast');
const checkbox = document.getElementById('degrees');

function updatePage(data) {
  let checked = false;
  if (checkbox.checked) {
    checked = true;
  }
  forecast.replaceChildren();
  city.innerText = data.weather.name + ',';
  country.innerText = data.country_name;
  current_temp.innerText = check(data.weather.main.temp, checked);
  max_temp.innerText = check(data.weather.main.temp_max, checked);
  min_temp.innerText = check(data.weather.main.temp_min, checked);
  current_time.innerText = new Date(
    data.weather.dt * 1000
  ).toLocaleTimeString();
  country_flag.src = data.country_flag;
  weather_icon.src = `http://openweathermap.org/img/wn/${data.weather.weather[0].icon}@2x.png`;
  feels_like.innerText = check(data.weather.main.feels_like, checked);
  weather_main.innerText = data.weather.weather[0].main;
  weather_desc.innerText = data.weather.weather[0].description;
  pressure.innerText = data.weather.main.pressure;
  humidity.innerText = data.weather.main.humidity;
  wind_speed.innerText = data.weather.wind.speed;
  sunrise.innerText = new Date(
    data.weather.sys.sunrise * 1000
  ).toLocaleTimeString();
  sunset.innerText = new Date(
    data.weather.sys.sunset * 1000
  ).toLocaleTimeString();
  getForecast(data.forecast.list, checked);
}

function getForecast(forecast_list, checked) {
  forecast_list.forEach((temp) => {
    const date = new Date(temp.dt * 1000);
    const day_temp = document.createElement('div');
    day_temp.classList.add('day-temp');
    const dateString = document.createElement('p');
    // const timetweleve = document.createElement('p');
    const time = document.createElement('p');
    const tempMain = document.createElement('p');
    const tempMaindegree = document.createElement('span');
    const weatherMain = document.createElement('p');
    const desc = document.createElement('p');
    const icon = document.createElement('img');
    dateString.innerText = date.toLocaleDateString();
    // timetweleve.innerText = date.toLocaleTimeString('en-US', { hour12: false });
    time.innerText = date.toLocaleTimeString();
    tempMaindegree.innerText = check(temp.main.temp, checked);
    tempMain.appendChild(tempMaindegree);
    tempMain.innerText = tempMain.innerText.concat('°');
    tempMain.dataset.temp = '';
    weatherMain.innerText = temp.weather[0].main;
    desc.innerText = temp.weather[0].description;
    icon.src = `http://openweathermap.org/img/wn/${temp.weather[0].icon}@2x.png`;
    day_temp.append(dateString, time, icon, tempMain, weatherMain, desc);
    forecast.append(day_temp);
  });
}

function check(weather_data, checked) {
  return !checked ? weather_data : FtoC(weather_data);
}

function changeDegree(e) {
  const allTemps = document.querySelectorAll('[data-temp]');
  if (e.target.checked) {
    return allTemps.forEach((the_temp) => {
      the_temp.innerText = FtoC(parseFloat(the_temp.innerText));
    });
  }
  allTemps.forEach((the_temp) => {
    the_temp.innerText = CtoF(parseFloat(the_temp.innerText));
  });
}

function FtoC(degree) {
  return Math.round((degree - 32) * 0.5556 * 100) / 100;
}

function CtoF(degree) {
  return Math.round((degree * 1.8 + 32) * 100) / 100;
}

export { updatePage, changeDegree };
