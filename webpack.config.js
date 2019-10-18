const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
	mode: 'development',
	entry: './src/index.ts',

	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},

	plugins: [new webpack.ProgressPlugin()],
	target: 'node',
	module: {
		rules: [
			{
				test: /.(ts|tsx)?$/,
				loader: 'ts-loader',
				include: [path.resolve(__dirname, 'src')],
				exclude: [/node_modules/]
			}
		]
	},
	devServer: {
		writeToDisk: true
	},
	externals: [nodeExternals()],
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	}
};
