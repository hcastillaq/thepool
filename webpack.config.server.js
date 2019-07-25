const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	devtool: "cheap-module-source-map",
	target: "node",
	mode: "development",
	entry: ['@babel/polyfill', "./src/start.js"],
	output:
	{
		filename: 'server.js',
		path: path.resolve(__dirname, './bin'),
		publicPath: '/public/',
		libraryTarget: "commonjs2"
	},
	module:
	{
		rules:
			[
				{
					test: /\.(js|ts|tsx)$/,
					loader: 'babel-loader',
				},
				{
					test: /\.(sa|sc|c)ss$/,
					use: [
						 MiniCssExtractPlugin.loader,
						"css-loader", // translates CSS into CommonJS
						"sass-loader" // compiles Sass to CSS, using Node Sass by default
					]
				}
			]
	},
	resolve:
	{
		extensions: ['.js', '.jsx', '.tsx', '.ts', '.json']
	}
}