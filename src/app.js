//Get loader image
require('file?name=[name].[ext]!./img/loader.gif');

//Get stylesheets
require('./styles/bootstrap.css');
require('./styles/app.scss');
require('style!css!../node_modules/toastr/build/toastr.css');

const $ = require('jquery');
const _ = require('ramda');
const toastr = require('toastr');

const $loader = $('.preloader');
// Hide splash screen loader
$(document).ready(() => $loader.fadeOut(1000));

//APP
const getHotels = require('./app/get_hotels');
const renderHotels = require('./app/render_hotels');

var setHtml = _.curry(($, selector, content) => $(selector).html(content))($);
var setHotelResults = setHtml('#hotelResults');
var showHotels = _.compose(setHotelResults, renderHotels);

//Bind click event for loading hotels
$('#loadHotels').on('click', () => {
	$loader.fadeIn(200);
	var xhr = getHotels((hotels) => {	
		$('#hotelResults').fadeOut(350, function() {
			showHotels(hotels);
			$loader.fadeOut(100);
			$(this).fadeIn(350);
		});
	});

	//Resolve error 
	xhr.fail((xhr, textStatus, error) => {	
    	$('#hotelResults').fadeOut(350, function(){
    		toastr.error( ( xhr.responseJSON.error || error ), 'Error!')
			$loader.fadeOut(100);	
    		$(this).empty().fadeIn(350);
    	});
	});
});
