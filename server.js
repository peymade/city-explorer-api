'use strict';

// without create-react-app managing our code, node likes require()  instead of `import`
const express = require('express');
const cors = require('cors');


// Heroku needs this!!
const PORT = process.env.PORT || 3030;

const weather = require('./data/weather.json');

// initilize the express library
const app = express();
app.use(cors());


// defining a function to run for each endpoint we want to get data from.
app.get('/weather', (request, response) => {

  let latQ = request.query.lat
  let lonQ = request.query.lon
  let searchQ = request.query.searchQuery

  try{
  const allForecast = weather.data.map(day => new Forecast(day)); 
  response.send(allForecast);
  } catch (error) {
    handleErrors(error, response);
  }

  // const data = [
  //   newLat, lonQ, searchQ
  // ]
  // response.json(data);
  
});

function Forecast(day){
  this.date = day.datetime;
  this.description = `Low of ${day.low_temp} and high of ${day.high_temp}, with ${day.weather.description}`;
}


function handleErrors(error, response) {
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
