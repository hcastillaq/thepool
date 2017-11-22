const webpack = require('webpack');
const config = 
{
  entry:
  {
    one: './src/js/app.js',
  },
  output:{
    path: __dirname + '/dist/js/',
    filename: '[name].js'
  }
}
module.exports  = config;