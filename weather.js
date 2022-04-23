'use strict';

const axios = require('axios');

async function getWeather (req, res) {
  let cityLat = req.query.lat
  let cityLon = req.query.lon;
  let weatherUrl = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&unit=I&days=3&lat=${cityLat}&lon=${cityLon}`;
  let results = await axios.get(weatherUrl);
  let weatherArr = results.data.data.map(weather => new Forecast(weather));
  res.send(weatherArr);
}

class Forecast {
  constructor(cityWeather) {
    this.date = cityWeather.datetime;
    this.description = cityWeather.weather.description;
  }
}

module.exports = getWeather;