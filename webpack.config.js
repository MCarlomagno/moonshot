const path = require('path');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: "./src/index.ts",
	devtool: 'inline-source-map',
	module: {
		rules: [
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
			],
	},
	resolve: {
		extensions: [ '.tsx', '.ts', '.js' ],
	},
	mode: 'production',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		new MinifyPlugin(),
		new HtmlWebpackPlugin({
				template: 'index.html',
				filename: 'index.html',
				minify: {
						collapseWhitespace: true
				}
		})
]
}