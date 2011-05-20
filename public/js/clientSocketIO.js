blackjackClient.connectToServer = function() {
  var aBlackjackClientInstance = this;

  aBlackjackClientInstance.socket = new io.Socket('localhost');
  aBlackjackClientInstance.socket.connect();

  aBlackjackClientInstance.socket.on('connect', function() {
    aBlackjackClientInstance.logMessage("Connected to server");
  });

  aBlackjackClientInstance.socket.on('message', function(serverMessage) {
    aBlackjackClientInstance.processIncommingMessage.apply(aBlackjackClientInstance, [ serverMessage ]);
  });

  aBlackjackClientInstance.socket.on('close', function() {
    aBlackjackClientInstance.logMessage("Connection closed");
  });

  aBlackjackClientInstance.socket.on('disconnect', function() {
    aBlackjackClientInstance.logMessage("Connection disconnected");
  });
};

$(document).ready(function() {
  blackjackClient.connectToServer();
});
