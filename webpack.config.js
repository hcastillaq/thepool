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
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        use:[
          {
            loader:'babel-loader',
            options: {
              presets: ['babel-preset-env']
            }
          }
        ],
        exclude:/node_modules/
      }
    ]
  }
}
module.exports  = config;