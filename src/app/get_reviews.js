const $ = require('jquery');

const api = require('./app.data');

// AjaxInterface => apiUrl => query => callback function
const getApiCall = require('./api_util.js');

let $get = getApiCall($);
let $getReviews = $get(api.getReviews);

module.exports = $getReviews;
