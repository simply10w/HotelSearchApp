const _ = require('ramda');
const $ = require('jquery');

const api = require('./app.data');

let getApiCall = _.curry(function(implementer, api, query, callback){
	return implementer.get(api + (query || ""), callback);
});

let $get = getApiCall($);

let getAllHotels = $get(api.getHotels);

let get5Hotels = getAllHotels('?count=5');

module.exports = get5Hotels;


