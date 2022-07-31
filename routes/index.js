const express = require('express');
const router = express.Router();
const axios = require('axios');

const ip_uri = `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.GEO_KEY}`;
let weather = null;
let country_name = null;
let country_flag = null;
let forecast = null;

router.get('/', async (req, res) => {
  try {
    const ip_Response = await axios.get(ip_uri);
    await getData(ip_Response.data.city)
    res.render('index', { weather, country_name, country_flag, forecast });
  } catch (error) {
    console.log(error.name);
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    console.log('Error', error.message)
    console.log(process.env.GEO_KEY)
  }
});

router.get('/search/:city', async(req, res) => {
  try {
    await getData(req.params.city)
    res.json({weather, country_name, country_flag, forecast})
  } catch (error) {
    console.log(error.response.statusText)
    res.status(404).json({error: error.response.statusText})
  }
})

async function getData(city) {
  const weather_uri = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_KEY}&units=imperial`;
  const weather_Response = await axios.get(weather_uri);
  weather = weather_Response.data
  const country_uri = `https://restcountries.com/v3.1/alpha/${weather_Response.data.sys.country}`;
  const country_Response = await axios.get(country_uri);
  country_name = country_Response.data[0].name.common;
  country_flag = country_Response.data[0].flags.png;
  const forecast_uri = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.WEATHER_KEY}&units=imperial`;
  const forecast_Response= await axios.get(forecast_uri);
  forecast = forecast_Response.data
}


module.exports = router;
