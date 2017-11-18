const { resolve } = require('path')
const { getSchedule } = require('../models')

const HTML = resolve(__dirname, '../dist/index.html')

const sendRes = res => [
	res.send.bind(res),
	err => res.status(500).send(err.message),
]

module.exports = function(app) {
	app.get('/api/schedule', (req, res) => {
		getSchedule().then(...sendRes(res))
	})

	app.get('/*', (req, res) => {
		res.sendFile(HTML)
	})
}
