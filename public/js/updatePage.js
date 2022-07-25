const city = document.querySelector('.city');
const country = document.querySelector('.country');
const current_temp = document.querySelector('.current-temp');
const max_temp = document.querySelector('.max-tem');
const min_temp = document.querySelector('.min-temp');
const current_time = document.querySelector('.current-time');

function updatePage(data) {
    console.log(data.weather)
  city.innerText = data.weather.name;
  country.innerText = data.country_name;
  current_temp.innerText = data.weather.main.temp;
  max_temp.innerText = data.weather.main.temp_max;
  min_temp.innerText = data.weather.main.temp_min;
  current_time.innerText = new Date(data.weather.dt * 1000).toLocaleTimeString();
}

export default updatePage;
