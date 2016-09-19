const _ = require('ramda');
const $ = require('jquery');

const api = require('./app.data');
const getApiCall = require('./api_util.js');

let $get = getApiCall($);

let getAllHotels = $get(api.getHotels);

let get5Hotels = getAllHotels('?count=5');

module.exports = get5Hotels;


