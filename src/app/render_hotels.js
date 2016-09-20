require('../styles/hotel.scss');
let hotelView = require('html!../views/hotel.view.hbs');

const handlebars = require('handlebars');
const _ = require('ramda');

handlebars.registerHelper('getImage', (images) => {
  return handlebars.escapeExpression(images[0]) || 'http://en.series-tv-shows.com/pic/no-fanart-available.jpg';
});

// String => Date
let wrapWithClass = (date) => new Date(date);
// Date => String
let formNewDate = (date) => `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`; 
// String => [String]
let splitIntoSections = _.split('.');
// String => String
let addZeroToOneDigit = (number) => number.length < 2 ? '0' + number : number; 
// [String] => String
let joinSections = _.join('.');
// String => String
let formatDate = _.compose(joinSections, _.map(addZeroToOneDigit), splitIntoSections, formNewDate, wrapWithClass);

handlebars.registerHelper('formatDate', formatDate);

// Any => String
let getStarHtml = () => '<span>&#9733;</span>';
// Any => String
let getStar = _.compose(_.identity, getStarHtml);
// Number => String
let compileStars = _.compose(_.join(' '), _.times(getStar));
// String => HandlebarsString
let wrapWithSafeString = (string) => new handlebars.SafeString(string);
// Number => HandlebarsString
let showStars = _.compose(wrapWithSafeString, compileStars);

handlebars.registerHelper('showStars', showStars);

//HtmlString => HtmlDom
let compileHotels = handlebars.compile(hotelView);
// Any => JSON
let wrapHotels = hotels => {
	return { hotels: hotels };
};

// Any => HtmlDom
let renderHotels = _.compose(compileHotels, wrapHotels);

module.exports = renderHotels;