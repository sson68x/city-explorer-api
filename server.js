'use strict';

console.log('this is our new server.');

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const weather = require('./modules/weather.js');
const getMovies = require('./movies')

const app = express();
app.use(cors());

let PORT = process.env.PORT || 3002

app.get('/', (request, response) => {
  response.send('Simon\'s City Explorer Server')
});

app.get('/weather', weatherHandler);

app.get('/movies', getMovies);

function weatherHandler(request, response) {
  const cityLat = request.query.lat;
  const cityLon = request.query.lon;
  weather(cityLat, cityLon)
  .then(summaries => response.send(summaries))
  .catch((error) => {
    console.error(error);
    response.status(200).send('Sorry. Something went wrong!')
  });
}  

app.listen(process.env.PORT, () => console.log(`Server up on ${PORT}`));