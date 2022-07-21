const wname = document.getElementById('weather_name')
const what = document.getElementById('what')

function fetchWeather() {
    fetch('/search').then((res) => res.json()).then((data) => {
        console.log(data.name)
        wname.innerHTML = data.name
    })
}

what.addEventListener('click', fetchWeather)
