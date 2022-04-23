'use strict';

const axios = require('axios');

let cache = require('./cache.js');

async function getMovies(req, res) {
    console.log(req.query.searchQuery);

    let searchQuery = req.query.searchQuery;
    
    let moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
    console.log(moviesUrl);
    let results = await axios.get(moviesUrl);
    let moviesArr = results.data.results.map(movie => new Movies(movie));
    res.send(moviesArr);
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