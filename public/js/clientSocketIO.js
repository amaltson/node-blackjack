var blackjackClient = new BlackjackClient();

blackjackClient.connectToServer = function(userId) {
  var aBlackjackClientInstance = this;

  aBlackjackClientInstance.socket = new io.Socket('localhost');
  aBlackjackClientInstance.socket.connect();

  aBlackjackClientInstance.socket.on('connect', function() {
    aBlackjackClientInstance.logMessage("Connected to server");
    aBlackjackClientInstance.loginPrompt(function(userId) {
      aBlackjackClientInstance.socket.send({
        player : {
          userId : userId,
          name : userId
        },
        action : 'login'
      });
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

blackjackClient.hit = function(playerUserId) {
  console.log(playerUserId + " pressed hit");
  this.socket.send({
    userId : playerUserId,
    action : "hit"
  });
};

blackjackClient.stay = function(playerUserId) {
  console.log(playerUserId + " pressed stay");
  this.socket.send({
    userId : playerUserId,
    action : "stay"
  });
};

$(document).ready(function() {
  blackjackClient.connectToServer();
});
