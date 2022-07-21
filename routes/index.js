const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const axios = require('axios');

const ip_uri = `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.GEO_KEY}`;
let weather;

router.get('/', async (req, res) => {
  const ip_Response = await fetch(ip_uri);
  const ip = await ip_Response.json();
  const weather_uri = `https://api.openweathermap.org/data/2.5/weather?q=${ip.city}&appid=${process.env.WEATHER_KEY}&units=imperial`;
  const weather_Response = await fetch(weather_uri);
  weather = await weather_Response.json();
  const country_uri = `https://restcountries.com/v3.1/alpha/${weather.sys.country}`
  const country_Response = await fetch(country_uri);
  const country  = await country_Response.json();
  const forecast_uri = `https://api.openweathermap.org/data/2.5/forecast?q=${ip.city}&appid=${process.env.WEATHER_KEY}&units=imperial`
  const forecast_Response = await fetch(forecast_uri);
  const forecast = await forecast_Response.json()
  res.render('index', { weather: weather , country_name: country[0].name.common, country_flag: country[0].flags.png, forecast:forecast});
});

router.get('/search', async (req, res) => {
  const weather_uri = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${process.env.WEATHER_KEY}`;
  const weather_Response = await fetch(weather_uri);
  weather = await weather_Response.json();
  res.json(weather)
});

module.exports = router;
