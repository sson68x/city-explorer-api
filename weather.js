'use strict';

const axios = require('axios');

async function getWeather (req, res) {
  console.log(req.query.searchQuery);
  let searchQuery = req.query.searchQuery;
  let weatherUrl = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&unit=I&days=3&city=${searchQuery}`;
  console.log(weatherUrl);
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
