const $ = require('jquery');

const api = require('./app.data');
const getApiCall = require('./api_util.js');

// AjaxInterface => apiUrl => query => callback function
let $get = getApiCall($);

let getAllHotels = $get(api.getHotels);

let get5Hotels = getAllHotels('?count=5');

module.exports = get5Hotels;


