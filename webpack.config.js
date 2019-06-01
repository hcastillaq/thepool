const path = require('path');

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output:{
    filename: "bundle.js",
    path: path.resolve(__dirname, "public/js")
  },
  module:{
    rules:[
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use:{
          loader: "babel-loader"
        }
      },
      {
        test: /\.sass$/,
        use: [
            "style-loader", 
            "css-loader", 
            "sass-loader"
        ]
      }
    ]
  },
  devServer:{
    contentBase: path.join(__dirname, "public"),
    port: 9000,
    compress: true
  }
}