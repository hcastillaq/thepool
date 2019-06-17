const path = require('path');
const webpack = require('webpack');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

var clientConfig =
{
	entry: "./src/index.js",
	output: {
		filename: 'js/bundle.js',
		path: path.resolve(__dirname, 'public'),
		sourceMapFilename: 'bundle.map'
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: ["source-map-loader", "babel-loader"],
				enforce: "pre"

			},
			{
				test: /\.js$/,
				use: ["source-map-loader", "babel-loader"],
				enforce: "pre"
			},
			{
				test: /\.(sa|sc|c)ss$/,
				exclude: /node_modules/,
				use: [
					MiniCSSExtractPlugin.loader,
					"css-loader",
					'sass-loader'
				]
			}
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	devServer: {
		contentBase: path.join(__dirname, "public"),
		port: 7000,
		compress: true
	},
	devtool: false,
	plugins: [
		new MiniCSSExtractPlugin({
			publicPath: '../',
			filename: "css/bundle.css",
		}),
		new webpack.SourceMapDevToolPlugin({
			filename: 'js/bundle.js.map',
		})
	]
}

module.exports = clientConfig;