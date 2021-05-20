'use strict';

require('dotenv').config();

// without create-react-app managing our code, node likes require()  instead of `import`
const express = require('express');
const cors = require('cors');

// For Heroku
const PORT = process.env.PORT || 3030;

// Import functions from other files
const handleWeather = require('./lib/weather.js');
const handleMovies = require('./lib/movie.js')

// initilize the express library
const app = express();
app.use(cors());

app.get('/weather', handleWeather);
app.get('/movies', handleMovies)

// open up the server on a specfic port
app.listen(PORT, () => console.log('Server is running'));
