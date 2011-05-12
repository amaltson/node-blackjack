require.paths.unshift('./node_modules')

var express = require('express');
var app = express.createServer();
var jade = require('jade');

app.get('/', function(req, res){
  jade.renderFile('views/index.jade', function(err, html) {
   /* res.send(html);*/
    res.send('hello, world');
  });
});

app.listen(9000);

var io = require('socket.io');
var socket = io.listen(app);
socket.on('connection', function(client) {

  console.log('connected with socket.io');
});
