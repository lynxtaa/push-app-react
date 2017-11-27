const webpack = require('webpack')
const { join } = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BabiliPlugin = require('babili-webpack-plugin')

const PATHS = {
	app: join(__dirname, 'src'),
	dist: join(__dirname, 'dist'),
}

const GLOBALS = {
	'process.env.NODE_ENV': JSON.stringify('production'),
}

module.exports = {
	output: {
		chunkFilename: 'js/[name].[chunkhash:8].js',
		filename: 'js/[name].[chunkhash:8].js',
		path: PATHS.dist,
		publicPath: '/',
	},
	devtool: 'source-map',
	entry: { app: './src' },
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({ use: 'css-loader', fallback: 'style-loader' }),
			},

			{
				test: /\.(png|jpg|svg)$/,
				use: {
					loader: 'url-loader',
					options: { limit: 5000, name: 'img/[name].[ext]' },
				},
			},
		],
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: ({resource}) => resource && resource.match(/node_modules.*\.js$/),
		}),
		new webpack.optimize.CommonsChunkPlugin({ name: 'manifest', minChunks: Infinity }),

		new ExtractTextPlugin({
			allChunks: true,
			filename: 'styles/[name].[contenthash:8].css',
		}),

		new webpack.DefinePlugin(GLOBALS),
		new BabiliPlugin(),
	],
}
