const $ = require('jquery');

const api = require('./app.data');

// AjaxInterface => apiUrl => query => callback => XHR
const getApiCall = require('./api_util.js');

// apiUrl => query => callback => XHR
let $get = getApiCall($);

// query => callback => XHR
let $getReviews = $get(api.getReviews);

module.exports = $getReviews;
