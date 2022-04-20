'use strict';

console.log('our first server');

//REQUIRE
const express = require('express');
require('dotenv').config();
let weatherData = require('./data/weather.json');

//USE
const app = express();
//app is instance of express


//define PORT
const PORT = process.env.PORT || 3002;

//ROUTES
app.get('/', (request, response) => {
  response.send('Hello, from our server');
});
app.get('/weather', (request, response) => {
  let searchQuery = request.query.searchQuery;
  let cityWeather = weatherData.find(data =>
    data.city_name.toLocaleLowerCase() === searchQuery.toLocaleLowerCase());
  let cityForecast = cityWeather.data.map (weather => {
    return new Forecast(weather);
  });
  response.send(cityForecast);
});

//at the bottom of all our routes
app.get('*', (request, response) => {
  response.send('Not sure what you are looking for')
});


//ERRORS

//CLASSES
class Forecast {
  constructor(cityWeather) {
    this.date = cityWeather.datetime;
    this.description = cityWeather.weather.description;
  }
}

//LISTEN
//Start the server
//listen is an Express method that takes in a PORT value
app.listen(PORT, () => console.log(`listening on ${PORT}`))
