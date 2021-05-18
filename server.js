'use strict';

// without create-react-app managing our code, node likes require()  instead of `import`
const express = require('express');
const cors = require('cors');

// Heroku needs this!!
const PORT = process.env.PORT || 3030;

// initilize the express library
const app = express();
app.use(cors());

// const Forecast = new Forecast({
//   this.
// })

// defining a function to run for each endpoint we want to get data from.
app.get('/weather', (request, response) => {


  let lat = request.query.lat
  let lon = request.query.lon
  let search = request.query.searchQuery

  const data = [
    lat, lon, search
  ]


  // Forecast.find

  response.json(data);
});







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
