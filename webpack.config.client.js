const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactLoadableSSRAddon = require('react-loadable-ssr-addon');

module.exports = {
	devtool: "cheap-module-source-map",
	target: "web",
	mode: "development",
	entry: "./src/index.js",
	output:
	{
		filename: 'js/bundle.js',
		path: path.resolve(__dirname, './public'),
		publicPath: '/static/',
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
	},
	plugins: [
		new MiniCssExtractPlugin({
			publicPath: '../',
			filename: "css/bundle.css",
		}),
		new ReactLoadableSSRAddon({
			filename: 'react-loadable-ssr-addon.json',
		})
	],
	devServer: {
		contentBase: path.join(__dirname, "public"),
		index: './public/index.html',
		publicPath: '/static/',
		port: 7000,
		compress: true,
		hot: true,
		historyApiFallback: true
	},
	optimization: {
    nodeEnv: 'development',
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
  },
};
