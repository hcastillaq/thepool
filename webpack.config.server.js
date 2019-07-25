const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const ReactLoadableSSRAddon = require('react-loadable-ssr-addon');

const serverConfig = {
	entry: './src/start.js',
	target: "node",
	output: {
		path: path.resolve(__dirname, './build'),
		filename: "server.js",
		libraryTarget: "commonjs2",
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
		new ReactLoadableSSRAddon()
	],
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
					minChunks: 2,
				},
				default: {
					minChunks: 2,
					reuseExistingChunk: true,
				},
			},
		},
		minimizer: [new TerserPlugin(
			{
				sourceMap: true,
				parallel: true,
				terserOptions: {
					output: {
						comments: false,
					},
				},
			}
		)],
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
	},
};

module.exports = serverConfig