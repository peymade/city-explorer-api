'use strict';

function Error(error, response) {
  response.status('500').send('Internal Server Error');
}

module.exports = Error;
