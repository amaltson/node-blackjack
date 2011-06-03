/**
 * BlackjackSocketIOClient handles client socket IO.
 */
var BlackjackSocketIOClient = function BlackjackSocketIOClient() {
  /**
   * Socket io connection.
   */
  this.socket = "";
};

BlackjackSocketIOClient.prototype = new BlackjackUI();

var blackjackSocketIOClient = new BlackjackSocketIOClient();
blackjackSocketIOClient.connectToServer = function(userId) {
  var anInstance = this;

  anInstance.socket = new io.Socket('localhost');
  anInstance.socket.connect();

  anInstance.socket.on('connect', function() {
    anInstance.logMessage("Connected to server");
    anInstance.loginPrompt(function(userId) {
      anInstance.socket.send({
        player : {
          userId : userId,
          name : userId
        },
        action : 'login'
      });
    });
  });

  anInstance.socket.on('message', function(serverMessage) {
    anInstance.processIncommingMessage.apply(anInstance, [ serverMessage ]);
  });

  anInstance.socket.on('close', function() {
    anInstance.logMessage("Connection closed");
    anInstance.disableTurnForAllPlayers();
  });

  anInstance.socket.on('disconnect', function() {
    anInstance.logMessage("Connection disconnected");
    anInstance.disableTurnForAllPlayers();
  });
};

// augmenting BlackjackUI's prototype to support hit action
BlackjackUI.prototype.hit = function(playerUserId) {
  console.log(playerUserId + " pressed hit");
  this.socket.send({
    userId : playerUserId,
    action : "hit"
  });
};

// augmenting BlackjackUI's prototype to support stay action
BlackjackUI.prototype.stay = function(playerUserId) {
  console.log(playerUserId + " pressed stay");
  this.socket.send({
    userId : playerUserId,
    action : "stay"
  });
};
