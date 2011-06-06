require.paths.unshift('./node_modules');

var express = require('express');
var app = express.createServer();

var GameController = require('./scripts/gameController.js');
var Blackjack = require('./scripts/game.js');

app.configure(function() {
  app.use(express.static(__dirname + '/public'));
});

app.listen(9000);

var io = require('socket.io');
var socket = io.listen(app);

var gameController = new GameController(socket, new Blackjack());
gameController.initialize();


