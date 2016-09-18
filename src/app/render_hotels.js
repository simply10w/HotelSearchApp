var hotelView = require('html!../views/hotel.view.hbs');

const handlebars = require('handlebars');
const _ = require('ramda');

handlebars.registerHelper('getImage', function(images) {
  return images[0] || 'http://en.series-tv-shows.com/pic/no-fanart-available.jpg';
});

var compileHotels = handlebars.compile(hotelView);

var wrapHotels = hotels => {
	return { hotels: hotels };
};

var renderHotels = _.compose(compileHotels, wrapHotels);

module.exports = renderHotels;