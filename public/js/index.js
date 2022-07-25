import updatePage from "./updatePage.js";

const wname = document.querySelector('.city')
const searchForm = document.getElementById('search_form')
const city = document.querySelector('input[name=city]')

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

//minamilist wallpaper desktop landscape
