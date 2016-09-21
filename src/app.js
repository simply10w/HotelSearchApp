//Get loader image
require('file?name=[name].[ext]!./img/loader.gif');

//Get stylesheets
require('./styles/app.scss');
require('style!css!../node_modules/toastr/build/toastr.css');

//Get libraries for use in this file
//jquery for easy DOM manipulation
const $ = require('jquery');
//ramda for functional programming
const _ = require('ramda');
//for nice and elegant notification showing
const toastr = require('toastr');

//get loader inside a global variable so we can use it throughout the app
const $loader = $('.preloader');

//ids or classes for significant elements
const appConfig = {
	loadHotels: '#loadHotels',
	hotelsContainer: '#hotelResults',
	loadReviews: '.show-review',
	hotelClass: '.hotel',
	reviewsContainer: '#hotelReviews'
};

// Hide splash screen loader
$(document).ready(() => $loader.fadeOut(500));

//APP

// callback => JSON
const getHotels = require('./app/get_hotels');

//query => callback => JSON
const hotelReviews = require('./app/get_reviews');

//JSON => String
const renderHotels = require('./app/render_hotels');

//JSON => String
const renderReviews = require('./app/render_reviews');

// DOMInterface => Selector => DOMContent => DOMElement
var setHtml = _.curry(($, selector, content) => $(selector).html(content))($);

// DOMContent => DOMElement
var setHotelResults = setHtml(appConfig.hotelsContainer);

//JSON => DOMElement
var showHotels = _.compose(setHotelResults, renderHotels);


//Bind click event for loading hotels
//using regular functions as callbacks instead of arrow functions
//to have "this" point to the jquery object which triggered the events

$(appConfig.loadHotels).on('click', () => {
	//show loader
	$loader.fadeIn(200);
	
	//call api request to get hotels
	//get the xhr object to bind error handling
	var xhr = getHotels((hotels) => {	
		$(appConfig.hotelsContainer).fadeOut(350, function() {
			showHotels(hotels);
			$loader.fadeOut(100);
			$(this).fadeIn(350);
		});
	});

	//Resolve error 
	//bind error handling
	xhr.fail((xhr, textStatus, error) => {	
    	$(appConfig.hotelsContainer).fadeOut(350, function(){
    		toastr.error( ( xhr.responseJSON.error || error ), 'Error!')
			$loader.fadeOut(100);	
    		$(this).empty().fadeIn(350);
    	});
	});
});


//bind click event to any .show-review class inside #hotelResults
//using callback function as a regular function instead arrow functions
//to have "this" point to the jquery object which triggered the event
$(appConfig.hotelsContainer).on('click', appConfig.loadReviews, function(){
	let $btn = $(this);
	let $hotel = $btn.closest(appConfig.hotelClass);
	let reviewsOpen = $btn.data('reviews-open');
	
	//if reviews are not shown
	//make http request and show them
	if(!reviewsOpen) {
	    $btn
	    	.data('reviews-open', true)
	    	.text($btn.data('open-text'));

	    let getHotelReview = hotelReviews('?hotel_id=' + $btn.data('hotel-id'));
	    
	    let xhr = getHotelReview((data) => {
	    	$hotel
	    		.find(appConfig.reviewsContainer)
	    		.show()
	    		.html(renderReviews(data));
	    });

	    xhr.fail((xhr, textStatus, error) => {	
	    	$hotel
	    		.find(appConfig.reviewsContainer)
	    		.hide()
	    		.empty();
	    	toastr.error( ( xhr.responseJSON.error || error ), 'Error!')
			});
	}

	//if reviews are already shown
	//hide the reviews container
	else {
	    $btn
	    	.data('reviews-open', false)
	    	.text($btn.data('closed-text'));
	    
	    $hotel
	    	.find(appConfig.reviewsContainer)
	    	.empty()
	    	.hide();
	}

});

