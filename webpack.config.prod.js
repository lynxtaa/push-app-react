const webpack = require('webpack')
const {resolve} = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BabiliPlugin = require('babili-webpack-plugin')

const extractStyles = new ExtractTextPlugin({ filename: 'styles/[name].css' })

const GLOBALS = {
	'process.env.NODE_ENV': JSON.stringify('production'),
}

module.exports = {
	devtool: 'source-map',
	entry: './src/',
	devServer: { contentBase: resolve(__dirname, 'dist') },
	module: {
		rules: [
			{
				test: /\.css$/,
				use: extractStyles.extract({ use: 'css-loader', fallback: 'style-loader' }),
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

		extractStyles,

		new webpack.DefinePlugin(GLOBALS),
		new BabiliPlugin(),
	],
}
