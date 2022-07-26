const city = document.querySelector('.city');
const country = document.querySelector('.country');
const current_temp = document.querySelector('.current-temp');
const max_temp = document.querySelector('.max-temp');
const min_temp = document.querySelector('.min-temp');
const current_time = document.querySelector('.current-time');
const country_flag = document.getElementById('flag');
const weather_icon = document.getElementById('weather-icon');
const feels_like = document.querySelector('.feels-like');
const pressure = document.querySelector('.pressure');
const humidity = document.querySelector('.humidity');
const wind_speed = document.querySelector('.wind-speed');
const sunrise = document.querySelector('.sunrise');
const sunset = document.querySelector('.sunset');
const forecast = document.querySelector('.forecast');

function updatePage(data) {
  forecast.replaceChildren();
  city.innerText = data.weather.name;
  country.innerText = data.country_name;
  current_temp.innerText = data.weather.main.temp;
  max_temp.innerText = 'High: ' + data.weather.main.temp_max;
  min_temp.innerText = 'Low: ' + data.weather.main.temp_min;
  current_time.innerText = new Date(
    data.weather.dt * 1000
  ).toLocaleTimeString();
  country_flag.src = data.country_flag;
  weather_icon.src = `http://openweathermap.org/img/wn/${data.weather.weather[0].icon}@2x.png`;
  feels_like.innerText = data.weather.main.feels_like;
  pressure.innerText = data.weather.main.pressure;
  humidity.innerText = data.weather.main.humidity;
  wind_speed.innerText = data.weather.wind.speed;
  sunrise.innerText = new Date(
    data.weather.sys.sunrise * 1000
  ).toLocaleTimeString();
  sunset.innerText = new Date(
    data.weather.sys.sunset * 1000
  ).toLocaleTimeString();
  data.forecast.list.forEach((temp) => {
    const date = new Date(temp.dt * 1000);
    const day_temp = document.createElement('div');
    day_temp.classList.add('day-temp');
    const dateString = document.createElement('p');
    const timetweleve = document.createElement('p');
    const time = document.createElement('p');
    const tempMain = document.createElement('p');
    const weatherMain = document.createElement('p');
    const desc = document.createElement('p');
    const icon = document.createElement('img');
    dateString.innerText = date.toLocaleDateString();
    timetweleve.innerText = date.toLocaleTimeString('en-US', { hour12: false });
    time.innerText = date.toLocaleTimeString();
    tempMain.innerText = temp.main.temp;
    weatherMain.innerText = temp.weather[0].main;
    desc.innerText = temp.weather[0].description;
    icon.src = `http://openweathermap.org/img/wn/${temp.weather[0].icon}@2x.png`;
    day_temp.append(
      dateString,
      timetweleve,
      time,
      tempMain,
      icon,
      weatherMain,
      desc
    );
    forecast.append(day_temp);
  });
}

function changeDegree(e) {
  if (e.target.checked) {
    return (current_temp.innerText = FtoC(parseFloat(current_temp.innerText)));
  }
  current_temp.innerText = CtoF(parseFloat(current_temp.innerText));
}

function FtoC(degree) {
  return Math.round((degree - 32) * 0.5556 * 100) / 100;
}

function CtoF(degree) {
  return Math.round((degree * 1.8 + 32) * 100) / 100;
}

export { updatePage, changeDegree };
