const { join, resolve } = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OfflinePlugin = require('offline-plugin')

const paths = require('./paths')

process.env.NODE_ENV = 'production'

module.exports = {
	mode: 'production',
	bail: true,
	devtool: 'source-map',
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
	optimization: {
		splitChunks: { chunks: 'all' },
		runtimeChunk: { name: 'manifest' },
	},
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
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{ loader: 'css-loader', options: { sourceMap: true } },
					{ loader: 'sass-loader', options: { sourceMap: true } },
				],
			},

			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{ loader: 'css-loader', options: { minimize: true } },
				],
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

		new MiniCssExtractPlugin({
			filename: 'styles/[name].[contenthash:8].css',
			chunkFilename: 'styles/[name].[contenthash:8].chunk.css',
		}),

		new OfflinePlugin(),
	],
}
