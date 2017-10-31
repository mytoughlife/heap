var webpack = require('webpack');
var path = require('path');

var APP_DIR = path.resolve(__dirname, 'client');
var OUTPUT_DIR = path.resolve(__dirname, 'public');

var config = {
  entry: APP_DIR + '/index.js',
  output: {
    path: OUTPUT_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.js?/,
        include : APP_DIR,
        loader : 'babel-loader'
      }
    ]
  }

};

module.exports = config;