const presets = [
	['@babel/env', { useBuiltIns: 'entry', modules: false }],
	['@babel/react', { development: process.env.NODE_ENV == 'development' }],
]

const plugins = [
	['@babel/proposal-object-rest-spread', { useBuiltIns: true }],
	['@babel/plugin-proposal-class-properties', { loose: true }],
]

if (process.env.NODE_ENV == 'development') {
	plugins.push('react-hot-loader/babel')
} else if (process.env.NODE_ENV == 'production') {
	plugins.push(['transform-react-remove-prop-types', { removeImport: true }])
}

module.exports = { presets, plugins }
