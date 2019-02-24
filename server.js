const { join } = require('path')
const express = require('express')
const compression = require('compression')
const morgan = require('morgan')

const app = express()

app.set('port', process.env.PORT || 3000)

app.use(compression())

const distFolder = join(__dirname, 'dist')
app.use(express.static(distFolder))

app.use(morgan(process.env.NODE_ENV === 'production' ? 'tiny' : 'dev'))

require('./controllers')(app)

/* eslint-disable no-console, no-process-exit */
app.listen(app.get('port'), err => {
	console.log(err || `Listening http://localhost:${app.get('port')} (${app.get('env')})`)
})

process
	.on('uncaughtException', err => {
		console.log(`Uncaught Exception: ${err}`)
		process.exit(1)
	})
	.on('unhandledRejection', (reason, p) => {
		console.log(`Unhandled Rejection at Promise ${p} reason: ${reason}`)
	})
