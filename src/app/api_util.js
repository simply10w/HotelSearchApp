const _ = require('ramda');

// AjaxInterface => apiUrl => query => callback => XHR
let getApiCall = _.curry(function(implementer, api, query, callback){
	return implementer.get(api + (query || ""), callback);
});

module.exports = getApiCall;