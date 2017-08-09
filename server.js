const express = require('express')
const {join} = require('path')

const PORT = 8080
const distFolder = 'dist'

express()
	.use(express.static(distFolder))
	.get('*', (req, res) => {
		res.sendFile(join(__dirname, distFolder, 'index.html'))
	})
	.listen(PORT, err => {
		console.log(`Server started on: http://localhost:${PORT}`)
		if (err) {
			console.log(err)
		}
	})
