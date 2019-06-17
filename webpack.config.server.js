const webpack = require('webpack');
const path = require('path');

const serverConfig = {
	entry: './src/start.js',
	target: "node",
	output: {
		path: path.resolve(__dirname, './build'),
		filename: "server.js",
		libraryTarget: "commonjs2"
	},
	devtool: "cheap-module-source-map",
	module: {
		rules: [
			{
				test: /.js|.ts|.tsx|.jsx$/,
				exclude: /(node_modules)/,
				loader: "babel-loader",
			},
			{
				test: /\.(sa|sc|c)ss$/,
				exclude: /node_modules/,
				use: [
					"css-loader",
					'sass-loader'
				]
			}
		]
	},
	plugins: [
	],
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx']
	},
};

module.exports = [serverConfig]