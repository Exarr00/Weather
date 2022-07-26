import {updatePage, changeDegree} from "./update.js";

const wname = document.querySelector('.city')
const searchForm = document.getElementById('search_form')
const city = document.querySelector('input[name=city]')
const degree = document.getElementById('degrees')

function fetchWeather(e) {
    e.preventDefault();
    fetch(`/search/${city.value}`).then((res) => {
        if(res.ok){
            return res.json()
        }
        throw new Error('A problem occured while searching')
    }).then((data) => {
        updatePage(data)
    }).catch(error => {console.log(error)})
}

searchForm.addEventListener('submit', fetchWeather)
degree.addEventListener('click', changeDegree)

//minamilist wallpaper desktop landscape
