const presets = ['@babel/react']
const plugins = [
	['@babel/proposal-object-rest-spread', { useBuiltIns: true }],
	['@babel/plugin-proposal-class-properties', { loose: true }],
]

if (process.env.NODE_ENV != 'production') {
	plugins.push('react-hot-loader/babel')
}

module.exports = { presets, plugins }
