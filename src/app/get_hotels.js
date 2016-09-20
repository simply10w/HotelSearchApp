const $ = require('jquery');

const api = require('./app.data');
const getApiCall = require('./api_util.js');

// apiUrl => query => callback => XHR
let $get = getApiCall($);

// query => callback => XHR
let getAllHotels = $get(api.getHotels);

// callback => XHR
let get5Hotels = getAllHotels('?count=5');

module.exports = get5Hotels;


