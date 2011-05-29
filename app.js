require.paths.unshift('./node_modules');

var express = require('express');
var app = express.createServer();

var Blackjack = require('./scripts/gameState.js');
var game = new Blackjack();

app.configure(function() {
  app.use(express.static(__dirname + '/public'));
});

app.listen(9000);

var io = require('socket.io');
var socket = io.listen(app);
socket.on('connection', function(client) {
  console.log('connected with socket.io');
  var players = game.getAllPlayers(function() {
    var initialState = {
      players: players,
      action: 'players'
    };
  client.send(initialState);

  });
  client.on('message', function(msg) {
    console.log(msg);
    processMessage(msg);
  });
});

function processMessage(data) {
  if (data.action === "hit") {
    data.player.hand.push(dealNextCard());
    socket.broadcast(data.player);
  } else if (data.action === "stay") {
    socket.broadcast({userId: data.player.userId, action: 'turn'});
  }
}
