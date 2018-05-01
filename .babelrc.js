const presets = ['react-app']
const plugins = []

if (process.env.NODE_ENV == 'development') {
	plugins.push('react-hot-loader/babel')
}

module.exports = { presets, plugins }
