module.exports = function GameController(socket, game) {

  var socket = socket;
  var userToSocket = {};
  var game = game;

  var that = this;

  /**
   * Initializes this GameController by creating a new dealer and starting
   * to listen to socket.io events.
   */
  this.initialize = function() {
    this.createDealer();
    
    socket.on('connection', function(client) {

      that.clientConnected(client);

      client.on('message', function(msg) {
        that.processMessage(msg, function(userId) {
          // on login events, keep around the socket to userId
          userToSocket[userId] = client;
        });
      });
      client.on('disconnect', function() {
        that.clientDisconnected(client);
      });
    });
  };

  /**
   * A new client has connected. We need to send all the current connected
   * users to this new client and push down who's turn it is.
   */
  this.clientConnected = function(clientSocket) {
    var players = game.getAllPlayers(function(players) {
      var initialState = {
        players : players,
        action : 'start'
      };
      clientSocket.send(initialState);
      game.currentTurn(function(userId) {
        clientSocket.send({
          userId : userId,
          action : 'currentTurn'
        });
      });
    });
  };

  /**
   * A client has disconnected, we need to remove the associated user.
   */
  this.clientDisconnected = function(clientSocket) {
    for ( var id in userToSocket) {
      if (userToSocket[id] === clientSocket) {
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
  }

  /**
   * Process the message we got from the client based on action.
   */
  this.processMessage = function(data, callback) {
    switch (data.action) {
      case 'hit':
        this.playerHit(data)
        break;
      case 'stay':
        this.playerStay()
        break;
      case 'login':
        this.playerLogin(data, callback);
        break;
      default:
        // code
    }
  };

  /**
   * Player 'hit', asking for another card. Adds another card to the player.
   * Furthermore, we check if the player is bust or got blackjack.
   */
  this.playerHit = function(data) {
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
  };

  /**
   * The player 'stays', so we just need to move on to the next player.
   */
  this.playerStay = function() {
    game.nextTurn(function(userId) {
      that.sendTurn(userId);
    });
  };

  /**
   * The player is trying to log in. We'll need to add the player and
   * broadcast to everyone that the player was added. Furthermore,
   * if this is the first player, make it their turn.
   * We also have to sanitize the userid and avoid duplicates.
   *
   * @param data the data pushed to the server.
   * @param callback we need to callback with the userId so it can be
   * associated with a socket.
   */
  this.playerLogin = function(data, callback) {
    game.getPlayer(data.player.userId, function(player) {
      if (player) {
        data.player.userId += '1';
        data.player.name += '1';
      }

      // remove spaces to sanitize userId.
      data.player.userId = data.player.userId.replace(/\s+/g, '');

      // create the new player.
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
  }


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

  /**
   * Ends the blackjack game. Calculates the scores and pushes down an end state.
   * After 10 seconds, it restarts the game.
   */
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

        // restart the game.
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
