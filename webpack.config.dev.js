const webpack = require('webpack')
const {join} = require('path')

const PATHS = {
	app: join(__dirname, 'src'),
	dist: join(__dirname, 'dist'),
}

module.exports = {
	devtool: 'cheap-module-eval-source-map',

	devServer: {
		hot: true,
		publicPath: '/',
		contentBase: PATHS.dist,
		historyApiFallback: true,
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

	entry: [
		'react-hot-loader/patch',
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/only-dev-server',
		PATHS.app,
	],

	output: {
		devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
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
