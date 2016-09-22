const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const ENV =  process.env.npm_lifecycle_event;
const isProd = ( ENV === 'dist' || ENV === 'dist:serve' );

var config = {
  entry: "./src/app.js",
  output: {
    path: __dirname + '/public',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, 
        loader: "babel", 
        query: {
          presets: ['es2015']
        },
        exclude: /node_modules/ 
      },            
      { test: /\.scss$/, loader: "style-loader!css-loader!postcss-loader!sass-loader", exclude: /node_modules/ },            
      { test: /\.css$/, loader: "style-loader!css-loader!postcss-loader", exclude: /node_modules/ },
      { test: /\.html$/, loader: 'html-loader', exclude: /node_modules/ }
    ]
  },
  postcss: function() {
    return [precss, autoprefixer];
  },
  plugins: [
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development, 
      // ./public directory is being served 
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['public'] }
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      title: 'Hotels Search App'
    })
  ]
};

if(isProd) {
  config.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  );
}

module.exports = config;