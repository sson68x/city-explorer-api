'use strict';

console.log('our first server');

//REQUIRE
//dotenv allows us to get access to env
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
// let weatherData = require('./data/weather.json');

//app is an instance of express
const app = express();

//USE
app.use(cors())


//define PORT
const PORT = process.env.PORT || 3002;

//ROUTES
app.get('/', (request, response) => {
  response.send('Hello, from our server');
});


//****************** Lab 07 ********************
// app.get('/weather', (request, response) => {
//   console.log(request.query.searchQuery);
//   let searchQuery = request.query.searchQuery;
//   let cityWeather = weatherData.find(data =>
//     data.city_name.toLowerCase() === searchQuery.toLowerCase());
//   let cityForecast = cityWeather.data.map (weather => {
//     return new Forecast(weather);
//   });
//   response.send(cityForecast);
// });
//***********************************************

// ******************* Lab 08 ********************
app.get('/weather', async (req, res) => {
  console.log(req.query.searchQuery);
  let searchQuery = req.query.searchQuery;
  let weatherUrl = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&unit=I&days=3&city=${searchQuery}`;
  console.log(weatherUrl);
  let results = await axios.get(weatherUrl);
  // console.log(results.data);
  let weatherArr = results.data.data.map(weather => new Forecast(weather));
  // let cityForecast = results.data.results.map (weather => {
  //   return new Forecast(weather);
  // });
  res.send(weatherArr);
})

app.get('/movies', async (req, res) => {
  console.log(req.query.searchQuery);
  let searchQuery = req.query.searchQuery;
  let moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
  console.log(moviesUrl);
  let results = await axios.get(moviesUrl);
  let moviesArr = results.data.results.map(movie => new Movies(movie));
  res.send(moviesArr);
})


//at the bottom of all our routes
app.get('*', (request, response) => {
  response.send('Not sure what you are looking for...')
});


//ERRORS

//CLASSES
class Forecast {
  constructor(cityWeather) {
    this.date = cityWeather.datetime;
    this.description = cityWeather.weather.description;
  }
}

class Movies {
  constructor(movies) {
    this.poster = movies.poster_path;
    this.title = movies.title;
    this.overview = movies.vote_average;
  }
}

//LISTEN
//Start the server
//listen is an Express method that takes in a PORT value
app.listen(PORT, () => console.log(`listening on ${PORT}`))
