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
    socket.send({
      userId : playerUserId,
      action : "hit"
    });
  };

  blackjackUI.stay = function(playerUserId) {
    socket.send({
      userId : playerUserId,
      action : "stay"
    });
  };
};
