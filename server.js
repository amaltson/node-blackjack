require.paths.unshift('./node_modules')

var express = require('express');
var app = express.createServer();
var jade = require('jade');

app.get('/', function(req, res){
  jade.renderFile(__dirname + '/views/index.jade', function(err, html) {
    if (err) throw err;
    console.log(html);
    res.send(html);
  });
});

app.listen(9000);

var io = require('socket.io');
var socket = io.listen(app);
socket.on('connection', function(client) {

  console.log('connected with socket.io');
});
