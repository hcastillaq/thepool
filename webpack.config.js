const webpack = require('webpack');
const config = 
{
  entry:'./src/js/app.js',
  output:{
    path: __dirname + '/dist/js/',
    filename: 'bundle.js'
  }
}
module.exports  = config;