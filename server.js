'use strict';

require('dotenv').config();

// without create-react-app managing our code, node likes require()  instead of `import`
const express = require('express');
const cors = require('cors');
const axios = require('axios');


const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;


// Heroku needs this!!
const PORT = process.env.PORT || 3030;

const weather = require('./data/weather.json');

// initilize the express library
const app = express();
app.use(cors());

app.get('/weather', handleWeather);
app.get('/movies', handleMovies)

async function handleWeather (request, response){

  const latQ = request.query.lat
  const lonQ = request.query.lon

  let url =`http://api.weatherbit.io/v2.0/forecast/daily?lat=${latQ}&lon=${lonQ}&key=${WEATHER_API_KEY}`

  try{

    const results = await axios.get(url);

    const allForecast = results.data.data.map(day => new Forecast(day)); 
    response.send(allForecast);

  } catch (error) {
    Error(error, response);
  }
  
};

async function handleMovies (request, response){

  const searchQ = request.query.search

  let urlMovie =`https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${searchQ}`

  try{

    const results = await axios.get(urlMovie);

    const allMovies = results.data.results.map(movie => new Movie(movie)); 
    response.send(allMovies);
    console.log(typeof(allMovies));

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

function Forecast(day) {
    this.date = day.datetime;
    this.description = `Low of ${day.low_temp} and high of ${day.high_temp}, with ${day.weather.description}`;
  
}

function Error(error, response) {
  response.status('500').send('Internal Server Error');
}


// app.get('/shoppinglist', (request, response) => {

//   const data = [
//     'milk',
//     'eggs',
//     'bread',
//   ]

//   response.json(data);
// });


// open up the server on a specfic port
app.listen(PORT, () => console.log('Server is running'));
