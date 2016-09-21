require('../styles/review.scss');
const reviewView = require('html!../views/review.view.hbs');

const handlebars = require('handlebars');
const _ = require('ramda');

// CompileFunction => JSON => String(DOMTree)
let renderJSON = _.curry( (compileFunc, JSON) => compileFunc(JSON) ); 

// String(DOMTree) => CompileFunction
let reviewsCompileFunction = handlebars.compile(reviewView);

// JSON => String(DOMTree)
let renderReviews = renderJSON(reviewsCompileFunction);

// Any => JSON
let wrapReviews = reviews => {
	return { reviews: reviews };
};

module.exports = _.compose(renderReviews, wrapReviews);

