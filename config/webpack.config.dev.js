const webpack = require('webpack')
const { join } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const paths = require('./paths')

process.env.NODE_ENV = 'development'

const GLOBALS = {
	'process.env.NODE_ENV': JSON.stringify('development'),
}

module.exports = {
	entry: { app: paths.appSrc },
	devtool: 'cheap-module-eval-source-map',
	output: {
		path: paths.appDist,
		filename: 'js/bundle.js',
		chunkFilename: 'js/[name].chunk.js',
		publicPath: 'http://localhost:8080/',
		devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
	},
	resolve: {
		alias: {
			'@components': join(paths.appSrc, 'components'),
			'@containers': join(paths.appSrc, 'containers'),
		},
		extensions: ['.js', '.json', '.jsx'],
	},
	devServer: {
		compress: true,
		hotOnly: true,
		historyApiFallback: true,
		proxy: { '/api': 'http://localhost:3000' },

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
	module: {
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
		new webpack.DefinePlugin(GLOBALS),
		new HtmlWebpackPlugin({ template: join(paths.appSrc, 'index.html') }),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
	],
}
