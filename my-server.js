'use strict';

console.log('our first server');

//REQUIRE
//dotenv allows us to get access to env
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const getMovies = require('./movies')
const getWeather = require('./weather')
require('dotenv').config();

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

app.get('/weather', getWeather);

app.get('/movies', getMovies);


//at the bottom of all our routes
app.get('*', (request, response) => {
  response.send('Not sure what you are looking for...')
});

//LISTEN
//Start the server
//listen is an Express method that takes in a PORT value
app.listen(PORT, () => console.log(`listening on ${PORT}`))
