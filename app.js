require.paths.unshift('./node_modules');

var express = require('express');
var app = express.createServer();

var Blackjack = require('./scripts/game.js');
var game = new Blackjack();

app.configure(function() {
  app.use(express.static(__dirname + '/public'));
});

app.listen(9000);

var io = require('socket.io');
var socket = io.listen(app);
socket.on('connection', function(client) {
  console.log('connected with socket.io');
  var players = game.getAllPlayers(function(players) {
    var initialState = {
      players: players,
      action: 'start'
    };
    client.send(initialState);
  });
  client.on('message', function(msg) {
    console.log('Client message: ' + msg);
    processMessage(msg);
  });
});

function processMessage(data) {
  switch(data.action) {
    case 'hit':
      var nextCard = game.dealNextCard();
      game.getPlayer(data.userId, function(player) {
        player.hand.push(nextCard);
        socket.broadcast({
          userId: data.player.userId,
          card: nextCard,
          action: 'hand'
        });
      });
      break;
    case 'stay':
      socket.broadcast({
        userId: data.player.userId,
        action: 'turn'
      });
      break;
    case 'login':
      var hand = [game.dealNextCard(), game.dealNextCard()];
      data.player.hand = hand;
      game.addPlayers(data.player, function() {
        socket.broadcast({
          player: data.player,
          action: 'add'
        });
      });
      break;
    default:
      // code
  }
}
