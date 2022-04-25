'use strict';

const axios = require('axios');
let cache = require('./modules/cache.js');

function getMovies(req, res) {
  let searchQuery = req.query.searchQuery;
  let key = 'movie-' + searchQuery
  
  let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Movies - Cache hit');
    res.send(cache[key].data);
  } else {
    console.log('Movies - Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    axios.get(movieUrl)
    .then(movieData => movieData.data.results.map(movie => new Movies(movie)))
    .then(newMovies => {
      cache[key].data = newMovies;
      res.send(newMovies)
    })
    .catch(err => console.error(err));
  }
}

class Movies {
    constructor(movies) {
      this.poster = movies.poster_path;
      this.title = movies.title;
      this.vote = movies.vote_average;
      this.overview = movies.overview;      
    };
  }

  module.exports = getMovies;