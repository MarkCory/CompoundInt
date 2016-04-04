var express = require('express')
var app = express()

app.use(express.static(__dirname + '/'))

var server = app.listen(3000, function () {
	console.log('Server running at http://localhost:' + server.address().port)
})