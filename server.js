require.paths.unshift('./node_modules');

var express = require('express');
var app = express.createServer();

app.configure(function() {
	app.use(express.static(__dirname + '/public'));
});

app.listen(9000);

var io = require('socket.io');
var socket = io.listen(app);
socket.on('connection', function(client) {
	console.log('connected with socket.io');
	client.send('This is your server. Thanks for connecting to me.');
});
