const webpack = require('webpack')
const { join, resolve } = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OfflinePlugin = require('offline-plugin')

const paths = require('./paths')

process.env.NODE_ENV = 'production'

const GLOBALS = {
	'process.env.NODE_ENV': JSON.stringify('production'),
}

module.exports = {
	bail: true,
	entry: { app: paths.appSrc },
	output: {
		chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
		filename: 'js/[name].[chunkhash:8].js',
		path: paths.appDist,
		publicPath: '/',
	},
	resolve: {
		alias: {
			'@components': join(paths.appSrc, 'components'),
			'@containers': join(paths.appSrc, 'containers'),
		},
		extensions: ['.js', '.json', '.jsx'],
	},
	devtool: 'source-map',
	module: {
		strictExportPresence: true,
		rules: [
			{
				test: /\.jsx?$/,
				include: paths.appSrc,
				enforce: 'pre',
				loader: 'eslint-loader',
			},

			{
				test: /\.jsx?$/,
				include: paths.appSrc,
				loader: 'babel-loader',
				options: { compact: true },
			},

			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: { loader: 'style-loader', options: { hmr: false } },
					use: { loader: 'css-loader', options: { minimize: true } },
				}),
			},

			{
				test: /\.(png|jpg|svg)$/,
				use: {
					loader: 'url-loader',
					options: { limit: 10000, name: 'img/[name].[ext]' },
				},
			},

			{
				test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
				use: {
					loader: 'file-loader',
					options: { name: 'fonts/[name].[hash:8].[ext]' },
				},
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(paths.appDist, { root: resolve(__dirname, '..') }),

		new HtmlWebpackPlugin({
			template: join(paths.appSrc, 'index.html'),
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true,
			},
		}),

		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: ({ resource }) => resource && resource.match(/node_modules.*\.js$/),
		}),
		new webpack.optimize.CommonsChunkPlugin({ name: 'manifest', minChunks: Infinity }),

		new ExtractTextPlugin({
			allChunks: true,
			filename: 'styles/[name].[contenthash:8].css',
		}),

		new webpack.DefinePlugin(GLOBALS),

		new webpack.optimize.UglifyJsPlugin({
			output: { comments: false, ascii_only: true },
			sourceMap: true,
		}),

		new OfflinePlugin(),
	],
}