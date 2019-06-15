const path = require('path');

var serverConfig = 
{
  devtool: 'eval-source-map',
  mode: "development",
  entry: "./server.js",
  output:{
    filename: "server.js",
    path: path.resolve(__dirname, "build")
  },
  module:{
    rules:[
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.js$/,
        use: ["source-map-loader", "babel-loader"],
        enforce: "pre"
      },
      {
        test: /\.sass$/,
        exclude: /node_modules/,
        use: [
            "style-loader", 
            "css-loader", 
            "sass-loader"
        ]
      }
    ],
  },
  node: {
    fs: "empty",
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  devServer:{
    contentBase: path.join(__dirname, "public"),
    port: 7000,
    compress: true
  }
}
module.exports = serverConfig;