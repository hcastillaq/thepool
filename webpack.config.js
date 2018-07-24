const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const extractSass = new ExtractTextPlugin({
  filename:  (getPath) => {
    return getPath('css/[name].css').replace('css/js', 'css');
  },
  allChunks: true
});

const config = 
{
  entry:
  {
    bundle: './src/index.js'
  },
  output:{
    path: __dirname + '/public',
    chunkFilename: './js/chunks/[name].[chunkhash].js',
    filename: './js/[name].js'
  },
  devtool: 'eval-source-map',
  module:{
    rules:[
      {
        test:/\.js$/,
        use:[
          {
            loader:'babel-loader',
            options: {
              presets: ['babel-preset-env', 'babel-preset-react']
            }
          }
        ],
        exclude:/node_modules/
      },
      {
        test: /\.sass$/,
        use: extractSass.extract({
          use: [
            {
              loader: "css-loader",
              options: { minimize: true }
            },
            {
              loader: "sass-loader"
            }
          ],
          fallback: "style-loader"
        }),
        exclude: /node_modules/
      }
    ]
  },
  devServer:{
    contentBase: __dirname + '/',
    port: 9000,
    host:'localhost',
    compress: true,
    open: true
  },
  plugins:[
    extractSass,
    /*
    new UglifyJsPlugin({
      parallel: true
    })*/
  ],
}
module.exports  = config;
