var Blackjack = require('./game.js');

module.exports = function GameController(socket) {

  var socket = socket;
  var userToSocket = {};
  var game = new Blackjack();

  var that = this;
  this.initialize = function() {
    socket.on('connection', function(client) {
      console.log('connected with socket.io');
      var players = game.getAllPlayers(function(players) {
        var initialState = {
          players : players,
          action : 'start'
        };
        client.send(initialState);
        game.currentTurn(function(userId) {
          client.send({
            userId : userId,
            action : 'currentTurn'
          });
        });
      });
      client.on('message', function(msg) {
        that.processMessage(msg, function(userId) {
          // on login events, keep around the socket to userId
          userToSocket[userId] = client;
        });
      });
      client.on('disconnect', function() {
        console.log('Client disconnected');
        for ( var id in userToSocket) {
          if (userToSocket[id] === client) {
            var userId = id;
          }
        }
        game.removePlayer(userId, function() {
          socket.broadcast({
            userId : userId,
            action : 'remove'
          });
          delete userToSocket[userId];
        });
      });
    });
  };

  this.processMessage = function(data, callback) {
    switch (data.action) {
    case 'hit':
      var nextCard = game.dealNextCard();
      game.getPlayer(data.userId, function(player) {

        // add the next card to the player
        player.hand.push(nextCard);
        socket.broadcast({
          userId : player.userId,
          card : nextCard,
          action : 'assignCard'
        });

          // check to make sure the player hasn't gone bust or got 21.
          var handValue = game.calculateHandValue(player.hand);
          if (handValue === game.BUSTED_VALUE) {
            socket.broadcast({
              userId: player.userId,
              action: 'bust'
            });
            game.nextTurn(function(userId) {
              that.sendTurn(userId);
            });
          } else if (handValue === game.BLACKJACK) {
            game.nextTurn(function(userId) {
              that.sendTurn(userId);
            });
          }
        });
        break;
      case 'stay':
        game.nextTurn(function(userId) {
          that.sendTurn(userId);
        });
        break;
      case 'login':
        game.getPlayer(data.player.userId, function(player) {
          if (player) {
            data.player.userId += '1';
            data.player.name += '1';
          }
          var hand = [game.dealNextCard(), game.dealNextCard()];
          data.player.hand = hand;
          game.addPlayers(data.player, function() {
            socket.broadcast({
              player: data.player,
              action: 'add'
            });
            callback(data.player.userId);
            game.getAllPlayers(function(players) {
              // if is the first player (after the dealer), make it
              // their turn.
              if (players.length === 2) {
                game.setTurn(data.player.userId, function() {
                  game.currentTurn(function(userId) {
                    that.sendTurn(userId);
                  });
                });
              }
            });
          });
        });
        break;
      default:
        // code
    }
  };

  this.createDealer = function() {
    var dealerCard = game.dealNextCard();
    game.addPlayers({
      userId : 'dealer',
      name : 'Dealer',
      hand : [ dealerCard, {
        type : "hidden"
      } ]
    }, function() {
    });
  };

  this.dealerLogic = function(dealer) {
    dealer.hand.pop();
    var dealerCard = null;
    var currentHandValue = 0;
    while (currentHandValue < 17) {
      dealerCard = game.dealNextCard();
      dealer.hand.push(dealerCard);
      currentHandValue = game.calculateHandValue(dealer.hand);
      socket.broadcast({
        userId : 'dealer',
        card : dealerCard,
        action : 'assignCard'
      });
    }
  };

  /**
   * Enables the turn for the given userId and broadcasts that it is that user's
   * turn.
   */
  this.sendTurn = function(userId) {

    // tell everyone who's turn it is.
    socket.broadcast({
      userId: userId,
      action: 'currentTurn'
    });
    
    // wisper to the actual player to enable their actions.
    if (userToSocket[userId]) {
      userToSocket[userId].send({
        userId: userId,
        action: 'turn'
      });
    }

    // if it's the dealer, end the game.
    if(userId === 'dealer') {
      this.endGame();
    }
  };

  this.endGame = function() {
    game.getPlayer('dealer', function(dealer) {

      // let the dealer play
      that.dealerLogic(dealer);

      // put together the game end state.
      var dealerHandValue = game.calculateHandValue(dealer.hand);
      var playersEndState = [];
      
      game.getAllPlayers(function(players) {
        for (var i = 0; i < players.length; i++) {
          if (players[i].userId === 'dealer') {
            continue;
          }
          var playerHandValue = game.calculateHandValue(players[i].hand);
          var resultState = game.determinePlayerWin(dealerHandValue, playerHandValue);
          playersEndState.push({
            userId: players[i].userId,
            state: resultState
          });
        }
        // push down the end state.
        socket.broadcast({
          players: playersEndState,
          action: 'end'
        });

        setTimeout(function() {
          game.resetPlayers(function(players) {
            socket.broadcast({
              players: players,
              action: 'start'
            });
            game.nextTurn(function(userId) {
              that.sendTurn(userId);
            });
          });
        }, 10000);
      });
    });
  };
  
  return this;
}
