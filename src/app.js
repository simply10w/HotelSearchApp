//Get loader image
require('file?name=[name].[ext]!./img/loader.gif');

//Get stylesheets
require('./styles/bootstrap.css');
require('./styles/app.scss');
require('style!css!../node_modules/toastr/build/toastr.css');

const $ = require('jquery');
const _ = require('ramda');
const toastr = require('toastr');

// Hide splash screen loader
$(document).ready(() => {
	let $loader = $('.preloader');
	
	$loader.fadeOut(1000, () => {
		$loader.remove();
	});
});

//APP
var getHotels = require('./app/get_hotels');
var renderHotels = require('./app/render_hotels');


var setHtml = _.curry(function(selector, content) {
	$(selector).html(content);
});

var setHotelResults = setHtml('#hotelResults');

var showHotels = _.compose(setHotelResults, renderHotels);

//Bind click event for loading hotels
$('#loadHotels').on('click', () => {
	var xhr = getHotels((hotels) => {	
		$('#hotelResults').fadeOut(350, function() {
			showHotels(hotels);
			$(this).fadeIn(350);
		});
	});

	//Resolve error 
	xhr.fail((xhr, textStatus, error) => {
    	$('#hotelResults').fadeOut(350, function(){
    		toastr.error('Something went wrong, please try again.', 'Error!')
    		$(this).empty().fadeIn(350);
    	});
	});
});
