const webpack = require('webpack')
const { join } = require('path')

const PATHS = {
	dist: join(__dirname, 'dist'),
}

module.exports = {
	devtool: 'cheap-module-eval-source-map',

	devServer: {
		hotOnly: true,
		contentBase: PATHS.dist,
		historyApiFallback: true,
		proxy: { "/api": "http://localhost:3000" },

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
			timings: false,
			usedExports: false,
			version: false,
			warnings: true,
		},
	},

	output: {
		devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
		publicPath: 'http://localhost:8080/',
	},

	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},

			{
				test: /\.(png|jpg|svg)$/,
				use: 'url-loader',
			},
		],
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
	],
}
