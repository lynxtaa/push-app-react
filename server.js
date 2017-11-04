const express = require('express')
const {join} = require('path')

const PORT = process.env.PORT || 8080
const distFolder = join(__dirname, 'dist')

express()
	.use(express.static(distFolder))
	.listen(PORT, err => err ?
		console.log(err) :
		console.log(`Server started on: http://localhost:${PORT}`)
	)
