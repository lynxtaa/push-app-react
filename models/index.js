const { readFile } = require('fs')
const { promisify } = require('util')
const { join } = require('path')

const schedulePath = join(__dirname, 'schedule.json')

exports.getSchedule = () =>
	promisify(readFile)(schedulePath, 'utf8').then(JSON.parse.bind(JSON))
