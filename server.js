var express = require('express');
var app = express.createServer();

app.get('/', function(req, res){
  res.send('Hello World');
});

app.listen(9000);

var io = require('socket.io');
var socket = io.listen(app);
socket.on('connection', function(client) {

  console.log('connected with socket.io');
});
