const path = require('path');

module.exports = {
  devtool: 'eval-source-map',
  mode: "development",
  entry: "./src/index.js",
  output:{
    filename: "bundle.js",
    path: path.resolve(__dirname, "public/js")
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
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  devServer:{
    contentBase: path.join(__dirname, "public"),
    port: 7000,
    compress: true
  }
}