/**
 * BlackjackSocketIOClient handles client socket IO.
 */
var BlackjackSocketIOClient = function BlackjackSocketIOClient(socket, blackjackUI) {
  this.connectToServer = function() {
    socket.connect();
    socket.on('connect', function() {
      blackjackUI.logMessage("Connected to server");
      blackjackUI.loginPrompt(function(userId) {
        socket.send({
          player : {
            userId : userId,
            name : userId
          },
          action : 'login'
        });
      });
    });

    socket.on('message', function(serverMessage) {
      blackjackUI.processIncommingMessage(serverMessage);
    });

    socket.on('close', function() {
      blackjackUI.logMessage("Connection closed");
      blackjackUI.disableTurnForAllPlayers();
    });

    socket.on('disconnect', function() {
      blackjackUI.logMessage("Connection disconnected");
      blackjackUI.disableTurnForAllPlayers();
    });

  };

  blackjackUI.hit = function(playerUserId) {
    // TODO Lab 2 Task 2 invoke send api on socket to send a json message that
    // has
    // userId and
    // action properties.
    // userId is the parameter and action is 'hit'
  };

  blackjackUI.stay = function(playerUserId) {
    // TODO Lab 2 Task 2 invoke send api on socket to send a json message that
    // has
    // userId and
    // action properties.
    // userId is the parameter and action is 'stay'
  };
};
