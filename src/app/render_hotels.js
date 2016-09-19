require('../styles/hotel.scss');
var hotelView = require('html!../views/hotel.view.hbs');

const handlebars = require('handlebars');
const _ = require('ramda');

handlebars.registerHelper('getImage', (images) => {
  return handlebars.escapeExpression(images[0]) || 'http://en.series-tv-shows.com/pic/no-fanart-available.jpg';
});

handlebars.registerHelper('formatDate', (date) => {
  let wrapWithClass = (date) => new Date(date);
  let formNewDate = (date) => `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`; 
  let splitIntoSections = _.split('.');
  let addZeroToOneDigit = (number) => number.length < 2 ? '0' + number : number; 
  let joinSections = _.join('.');
  
  let format = _.compose(joinSections, _.map(addZeroToOneDigit), splitIntoSections, formNewDate, wrapWithClass);
  return format(date);
});

handlebars.registerHelper('showStars', (stars) => {
	let getStarHtml = () => '<span>&#9733;</span>';
	let getStar = _.compose(_.identity, getStarHtml);
	let render = _.compose(_.join(' '), _.times(getStar));
	return new handlebars.SafeString(render(stars));
});

var compileHotels = handlebars.compile(hotelView);

var wrapHotels = hotels => {
	return { hotels: hotels };
};

var renderHotels = _.compose(compileHotels, wrapHotels);

module.exports = renderHotels;