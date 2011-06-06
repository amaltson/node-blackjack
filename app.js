require.paths.unshift('./node_modules');

var cf = require('cloudfoundry');
var express = require('express');
var app = express.createServer();

var GameController = require('./scripts/gameController.js');
var Blackjack = require('./scripts/game.js');

app.configure(function() {
  app.use(express.static(__dirname + '/public'));
});

app.listen(cf.port || 9000);

var socket = require("socket.io").listen(app, {
  transports: ['xhr-polling'],
  transportOptions: {
    'xhr-polling': {duration: 10000}
  }
});

var gameController = new GameController(socket, new Blackjack());
gameController.initialize();


