const webpack = require('webpack')
const { join } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const compression = require('compression')
const koaConnect = require('koa-connect')
const proxy = require('http-proxy-middleware')

const paths = require('./paths')

process.env.NODE_ENV = 'development'

module.exports = {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	entry: [paths.appSrc],
	output: {
		path: paths.appDist,
		filename: 'js/bundle.js',
		chunkFilename: 'js/[name].chunk.js',
		publicPath: '/',
		devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
	},
	resolve: {
		alias: {
			'@components': join(paths.appSrc, 'components'),
			'@containers': join(paths.appSrc, 'containers'),
		},
		extensions: ['.js', '.json', '.jsx'],
	},
	module: {
		strictExportPresence: true,
		rules: [
			{
				test: /\.jsx?$/,
				include: paths.appSrc,
				enforce: 'pre',
				loader: 'eslint-loader',
				options: { emitWarning: true },
			},

			{
				test: /\.jsx?$/,
				include: paths.appSrc,
				loader: 'babel-loader',
				options: { cacheDirectory: true },
			},

			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},

			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},

			{
				test: /\.(png|jpg|svg)$/,
				use: 'url-loader',
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
		new webpack.ProgressPlugin(),
		new HtmlWebpackPlugin({ template: join(paths.appSrc, 'index.html') }),
		new webpack.EnvironmentPlugin(['NODE_ENV']),
	],
}

module.exports.serve = {
	add(app) {
		app.use(koaConnect(compression()))
		app.use(koaConnect(proxy('/api', { target: 'http://localhost:3000' })))
	},
	dev: {
		stats: {
			assets: false,
			cached: false,
			cachedAssets: false,
			children: false,
			chunks: false,
			chunkModules: false,
			chunkOrigins: false,
			colors: true,
			depth: false,
			entrypoints: false,
			errors: true,
			errorDetails: true,
			hash: false,
			modules: false,
			moduleTrace: false,
			performance: false,
			providedExports: false,
			publicPath: false,
			reasons: false,
			source: false,
			timings: true,
			usedExports: false,
			version: false,
			warnings: true,
		},
	},
}
