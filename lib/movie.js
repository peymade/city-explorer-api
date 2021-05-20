'use strict';

const axios = require('axios');
const Error = require('../lib/error.js');


const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

async function handleMovies (request, response){

  const searchQ = request.query.search

  let urlMovie =`https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${searchQ}`

  try{
    const results = await axios.get(urlMovie);

    const allMovies = results.data.results.map(movie => new Movie(movie)); 
    response.send(allMovies);

  } catch (error) {
    Error(error, response);
  }
  
};


function Movie(movie) {

  this.title = movie.title;
  this.overview = movie.overview;
  this.average_votes = movie.vote_average;
  this.total_votes = movie.vote_count;
  this.image_url = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`;
  this.popularity = movie.popularity;
  this.released_on = movie.release_date;

}

module.exports = handleMovies;