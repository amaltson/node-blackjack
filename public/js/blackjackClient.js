/* Author: Ahmed Javed 
 */
var player1 = {
  userId : "player_1",
  name : "Player 1"
};
var player2 = {
  userId : "player_2",
  name : "Player 2"
};

var blackjackClient = {
  /**
   * Socket io connection.
   */
  socket : "",

  /**
   * Maximum number of logs to display on the main page.
   */
  maximumNumberOfLogsToDisplay : 3,

  processIncommingMessage : function(serverJsonMessage) {
    var jsonParsedMessage;
    this.logMessage("Message recieved:" + serverJsonMessage);
    // try {
    // jsonParsedMessage = JSON.parse(message);
    // } catch (SyntaxError) {
    // console.log('Invalid JSON: '+serverJsonMessage);
    // might to be the best way but ok for now
    // return;
    // }
    // switch (jsonParsedMessage.event) {
    switch ("") {
      default:
        // case 'gameFinished':
        // break;
        // case 'start':
        this.createDealerAndPlayers([ player1, player2 ]);
        // case 'end':
        // this.resetGame();
        // break;
        // case 'hands':
        // break;
        // case 'turn':
        this.enableTurnForPlayer(player1.userId);
        // break;
        // default:
        // console.log("ERROR: Message event not understood");
    }
  },
  /**
   * Logs a message on the main page.
   * 
   * @param message
   *          to log
   */
  logMessage : function(message) {
    if ($('#logList li').length === this.maximumNumberOfLogsToDisplay) {
      $('#logList li:first').remove();
    }
    $('#logList').append("<li>" + message + "</li>");
  },

  createDealerDivAndAppendToMainDiv : function() {
    $('#main').append(this.createPlayerDiv("dealer", "Dealer"));
  },

  // <div class="cards">
  // <img class="card_image" src="img/s07.gif" />
  // <img class="card_image" src="img/d05.gif" />
  // <img class="card_image" src="img/c01.gif" />
  // </div>
  createBlackjackPlayerDivAndAppendToMainDiv : function(playerUserId, playerDisplayName) {
    $('#main').append(this.createBlackjackPlayerDiv(playerUserId, playerDisplayName));
  },

  createBlackjackPlayerDiv : function(playerUserId, playerDisplayName) {
    var playerDiv = this.createPlayerDiv(playerUserId, playerDisplayName);
    var aBlackjackClientInstance = this;
    playerDiv.find('.cards')
        .after('<div class="player_action"> <button type="button">Hit</button> <button type="button">Stay</button> </div> <div class="stats"> <b>win: 0 lose: 0</b> </div>');
    var playerActionDiv = this.findPlayerActionDiv(playerDiv);
    playerActionDiv.hide();
    var hitButton = playerActionDiv.find(':button:first');
    hitButton.click(function() {
      aBlackjackClientInstance.hit.apply(aBlackjackClientInstance, [ playerUserId ]);
    });

    var stayButton = playerActionDiv.find(':button:last');
    stayButton.click(function() {
      aBlackjackClientInstance.stay.apply(aBlackjackClientInstance, [ playerUserId ]);
    });

    return playerDiv;
  },

  findPlayerActionDiv : function(playerDiv) {
    return playerDiv.find('.player_action');
  },

  createPlayerDiv : function(divId, nameToDisplay) {
    var playerDiv = $('<div id="' + divId + '"/>');
    playerDiv.append('<div class="turn_indicator">&nbsp;</div>');
    playerDiv.append('<div class="name">' + nameToDisplay + '</div>');
    playerDiv.append('<div class="cards">');
    return playerDiv;
  },

  assignPlayerHands : function(playersHands) {

  },

  hit : function(playerUserId) {
    console.log(playerUserId + " pressed hit");
  },

  stay : function(playerUserId) {
    console.log(playerUserId + " pressed stay");
  },

  enableTurnForPlayer : function(userId) {
    this.findPlayerActionDiv($('#' + userId)).show();
  },

  updateScoreForPlayer : function() {

  },
  removePlayer : function() {

  },

  resetGame : function() {

  },

  createDealerAndPlayers : function(players) {
    this.createDealerDivAndAppendToMainDiv();

    for ( var playerIndex = 0; playerIndex < players.length; playerIndex += 1) {
      var player = players[playerIndex];
      this.createBlackjackPlayerDivAndAppendToMainDiv(player.userId, player.name);
    }
  }
};