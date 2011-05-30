blackjackClient.connectToServer = function(userId) {
  var aBlackjackClientInstance = this;

  aBlackjackClientInstance.socket = new io.Socket('localhost');
  aBlackjackClientInstance.socket.connect();

  aBlackjackClientInstance.socket.on('connect', function() {
    aBlackjackClientInstance.logMessage("Connected to server");
    // TODO sample server message this has to be verified by arthurkalm
    aBlackjackClientInstance.socket.send({
      userId : userId,
      action : "login"
    });
  });

  aBlackjackClientInstance.socket.on('message', function(serverMessage) {
    aBlackjackClientInstance.processIncommingMessage.apply(aBlackjackClientInstance, [ serverMessage ]);
  });

  aBlackjackClientInstance.socket.on('close', function() {
    aBlackjackClientInstance.logMessage("Connection closed");
    aBlackjackClientInstance.disableTurnForAllPlayers();
  });

  aBlackjackClientInstance.socket.on('disconnect', function() {
    aBlackjackClientInstance.logMessage("Connection disconnected");
    aBlackjackClientInstance.disableTurnForAllPlayers();
  });
};

$(document).ready(function() {
  blackjackClient.getUserId(function(userId) {
    blackjackClient.connectToServer(userId);
  });
});
