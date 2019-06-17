const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

var clientConfig =
{
	target: "web",
	entry: "./src/index.js",
	cache: false,
	output: {
		filename: 'js/bundle.js',
		path: path.resolve(__dirname, './public'),
		publicPath: '/static/'
		
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
					MiniCSSExtractPlugin.loader,
					"css-loader",
					'sass-loader'
				]
			},
			{
				test: /global\.js$/,
				exclude: /node_modules/,
				use: ['script-loader']
			}
		],
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx']
	},
	plugins: [
		new MiniCSSExtractPlugin({
			publicPath: '../',
			filename: "css/bundle.css",
		}),
		new Visualizer({
			filename: 'statistics.html'
		}),
		new CompressionPlugin({
			filename: '[path].gz[query]',
			algorithm: 'gzip',
			compressionOptions: { level: 9 },
      threshold: 10240,
      minRatio: 1,
      deleteOriginalAssets: false
		}),
		//new HardSourceWebpackPlugin(),
		new webpack.IgnorePlugin({
			resourceRegExp: /^\.\/locale$/,
			contextRegExp: /moment$/
		}),
	],
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				parallel: true,
				uglifyOptions: {
					mangle: true,
					output: {
						comments: false,
					},
				},
			}),
		],
	},
	devServer: {
		contentBase: path.join(__dirname, "public"),
		port: 7000,
		compress: true,
		hot:true,
		injectHot:true,
		liveReload: false,
		index: './public/index.html',
		publicPath: '/static/'
	},
}

module.exports = (env, argv) => {
	mode = argv.mode;
	return clientConfig;
}