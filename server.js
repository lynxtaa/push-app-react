const { join } = require('path')
const express = require('express')
const compression = require('compression')
const morgan = require('morgan')
const { createWriteStream } = require('fs')
const wait = require('./middleware/wait')

const app = express()

app.set('port', process.env.PORT || 3000)

app.use(compression())

const distFolder = join(__dirname, 'dist')
app.use(express.static(distFolder))

if (app.get('env') == 'production') {
	const logPath = join(__dirname, 'access.log')
	app.use(morgan('short', { stream: createWriteStream(logPath, { flags: 'a' }) }))
} else {
	app.use(morgan('dev'))
}

if (app.get('env') == 'development') {
	app.use(wait(1000)) // emulate slow network
}

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
