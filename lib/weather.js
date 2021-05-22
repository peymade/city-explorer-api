'use strict';

const axios = require('axios');
const Error = require('../lib/error.js');


const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

// Create Object
const inMemory = {};


async function handleWeather (request, response){

  const latQ = request.query.lat
  const lonQ = request.query.lon

  let url =`http://api.weatherbit.io/v2.0/forecast/daily?lat=${latQ}&lon=${lonQ}&key=${WEATHER_API_KEY}`

  let weatherRecord = inMemory[latQ];

  // console.log(weatherRecord, Date.now() - 600000);

  let isFresh = undefined; 

  if(weatherRecord && weatherRecord.timestamp > (Date.now() - 10000)){
    isFresh = true;
  } else{
    isFresh = false;
  }

console.log(isFresh);

  if (isFresh) {
    console.log('getting data from db');
    // console.log(weatherRecord.data);

    response.send(weatherRecord.data);

  } else {
    console.log('requesting fresh data');

  try{

    const results = await axios.get(url);
    const allForecast = results.data.data.map(day => new Forecast(day)); 


    const databaseObject = {
      data: allForecast,
      timestamp: Date.now(),
    }

    console.log('storing');

    inMemory[latQ] = databaseObject;

    response.json(allForecast);

  } catch (error) {
    Error(error, response);
  }
  
}

};


function Forecast(day) {
  this.date = day.datetime;
  this.description = `Low of ${day.low_temp} and high of ${day.high_temp}, with ${day.weather.description}`;

}


module.exports = handleWeather;