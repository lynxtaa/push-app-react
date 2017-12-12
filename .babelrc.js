const presets = ['@babel/react']
const plugins = ['@babel/proposal-object-rest-spread']

if (process.env.NODE_ENV != 'production') {
	plugins.push('transform-es2015-classes', 'react-hot-loader/babel')
}

module.exports = { presets, plugins }
