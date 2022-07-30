import { updatePage, changeDegree } from './update.js';

const error_msg = document.querySelector('.error-msg');
const searchForm = document.getElementById('search-form');
const city = document.querySelector('input[name=city]');
const degree = document.getElementById('degrees');

function fetchWeather(e) {
  e.preventDefault();
  fetch(`/search/${city.value}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('A problem occured while searching');
    })
    .then((data) => {
      updatePage(data);
      city.value = '';
    })
    .catch((error) => {
      console.log(error);
      error_msg.style.display = 'inline';
      city.value = '';
      setTimeout(() => {
        error_msg.style.removeProperty('display');
      }, 3000);
    });
}

searchForm.addEventListener('submit', fetchWeather);
degree.addEventListener('click', changeDegree);

//minamilist wallpaper desktop landscape
