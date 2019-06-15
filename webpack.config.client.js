const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

var clientConfig =
{
	mode: "development",
	entry: "./src/index.js",
	output: {
		filename: 'js/bundle.js',
		path: path.resolve(__dirname, 'public')
	},
	module: {
		rules: [
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
	plugins: [
		new MiniCSSExtractPlugin({
			publicPath: '../',
			filename: "css/bundle.css",
		})
	]
}

module.exports = clientConfig;