'use strict';

const axios = require('axios');
const Error = require('../lib/error.js');


const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

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


function Forecast(day) {
  this.date = day.datetime;
  this.description = `Low of ${day.low_temp} and high of ${day.high_temp}, with ${day.weather.description}`;

}


module.exports = handleWeather;