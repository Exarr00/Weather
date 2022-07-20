const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const ip_uri= `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.GEO_KEY}`

router.get('/', async (req, res) => {
  const ip_Response = await fetch(ip_uri);
  const ip = await ip_Response.json();
  const weather_uri = `https://api.openweathermap.org/data/2.5/weather?q=${ip.city}&appid=${process.env.WEATHER_KEY}`;
  const weather_Response = await fetch(weather_uri);
  const weather = await weather_Response.json();
  console.log(weather)
  res.render('index');
});

module.exports = router;
