const wname = document.querySelector('.city')
const searchForm = document.getElementById('search_form')
const city = document.querySelector('input[name=city]')

function fetchWeather(e) {
    e.preventDefault();
    fetch(`/search/${city.value}`).then((res) => res.json()).then((data) => {
        console.log(data)
       wname.innerHTML='hello'
    }).catch(error => {wname.innerHTML='error'})
}

searchForm.addEventListener('submit', fetchWeather)

//minamilist wallpaper desktop landscape
