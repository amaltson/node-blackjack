/* Author: Ahmed Javed 
 */
var blackjackClient = {
socket : "",
maximumNumberOfLogs : 3
};

blackjackClient.connectToServer = function() {
  var aBlackjackClientInstance = this;
  aBlackjackClientInstance.socket = new io.Socket('localhost');
  aBlackjackClientInstance.socket.connect();
  aBlackjackClientInstance.socket.on('connect', function() {
    blackjackClient.logMessage("Connected to server");
  });

  this.socket.on('message', function(msg) {
    aBlackjackClientInstance.logMessage.apply(aBlackjackClientInstance, [ "Message recieved:" + msg ]);
  });

  this.socket.on('close', function() {
    aBlackjackClientInstance.logMessage("Connection closed");
  });
  this.socket.on('disconnect', function() {
    aBlackjackClientInstance.logMessage("Connection disconnected");
  });
};

blackjackClient.logMessage = function(message) {
  if ($('#logList li').length === this.maximumNumberOfLogs) {
    $('#logList li:first').remove();
  }
  $('#logList').append("<li>" + message + "</li>");
};

$(document).ready(function() {
  blackjackClient.connectToServer();
});
