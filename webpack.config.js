const webpack = require('webpack')
const merge = require('webpack-merge')
const { join } = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const developmentConfig = require('./webpack.config.dev')
const productionConfig = require('./webpack.config.prod')

const PATHS = {
	app: join(__dirname, 'src'),
	dist: join(__dirname, 'dist'),
}

const commonConfig = {
	resolve: {
		alias: {
			'@components': join(PATHS.app, 'components'),
			'@containers': join(PATHS.app, 'containers'),
		},
		extensions: ['.js', '.json', '.jsx'],
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: PATHS.app,
				enforce: 'pre',
				loader: 'eslint-loader',
				options: { emitWarning: true },
			},

			{
				test: /\.jsx?$/,
				include: PATHS.app,
				loader: 'babel-loader',
				options: { cacheDirectory: true },
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
		new HtmlWebpackPlugin({ template: './src/index.html' }),
	],
}

module.exports = function(env) {
	process.env.BABEL_ENV = env

	if (env == 'production') {
		return merge(commonConfig, productionConfig)
	}
	return merge(commonConfig, developmentConfig)
}
