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
        // case 'start':
        this.resetGame();
        this.addDealerAndBlackjackPlayers([ player1, player2 ]);
        // case 'end':
        // this.updateScores(players);
        // this.disableTurnForAllPlayers();
        // break;
        // case 'hand':
        this.assignCard(player1.userId, "");
        // break;
        // case 'turn':
        this.enableTurnForPlayer(player1.userId);
        // case 'remove':
        // break;
        // case 'add':
        // break;
        // case 'bust':
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

  findPlayerActionDiv : function(playerDiv) {
    return playerDiv.find('.player_action');
  },

  assignCard : function(userId, cardImageName) {

  },

  hit : function(playerUserId) {
    console.log(playerUserId + " pressed hit");
    this.socket.send({
      userId : playerUserId,
      action : "hit"
    });
  },

  stay : function(playerUserId) {
    console.log(playerUserId + " pressed stay");
    this.socket.send({
      userId : playerUserId,
      action : "stay"
    });
  },

  updateScores : function(players) {

  },

  removePlayer : function(playerUserId) {
    $('#main .player_action').hide();
  },

  resetGame : function() {
    $('#main').empty();
  },

  // <div class="cards">
  // <img class="card_image" src="img/s07.gif" />
  // <img class="card_image" src="img/d05.gif" />
  // <img class="card_image" src="img/c01.gif" />
  // </div>
  addDealerAndBlackjackPlayers : function(players) {
    this.addDealer();

    for ( var playerIndex = 0; playerIndex < players.length; playerIndex += 1) {
      var player = players[playerIndex];
      this.addBlackjackPlayer(player.userId, player.name);
    }
  },

  addDealer : function() {
    $('#main').append(this.createPlayerDiv("dealer", "Dealer"));
  },

  createPlayerDiv : function(divId, displayName) {
    var playerDiv = $('<div id="' + divId + '"/>');
    playerDiv.append('<div class="turn_indicator">&nbsp;</div>');
    playerDiv.append('<div class="name">' + displayName + '</div>');
    playerDiv.append('<div class="cards">');
    return playerDiv;
  },

  addBlackjackPlayer : function(playerUserId, playerDisplayName) {
    var aBlackjackClientInstance = this;

    var playerDiv = aBlackjackClientInstance.createPlayerDiv(playerUserId, playerDisplayName);
    playerDiv.find('.cards')
        .after('<div class="player_action"> <button type="button">Hit</button> <button type="button">Stay</button> </div> <div class="stats"> <b>win: 0 lose: 0</b> </div>');

    var playerActionDiv = aBlackjackClientInstance.findPlayerActionDiv(playerDiv);
    playerActionDiv.hide();

    var hitButton = playerActionDiv.find(':button:first');
    hitButton.click(function() {
      aBlackjackClientInstance.hit.apply(aBlackjackClientInstance, [ playerUserId ]);
    });

    var stayButton = playerActionDiv.find(':button:last');
    stayButton.click(function() {
      aBlackjackClientInstance.stay.apply(aBlackjackClientInstance, [ playerUserId ]);
    });

    $('#main').append(playerDiv);
  },

  enableTurnForPlayer : function(userId) {
    this.disableTurnForAllPlayers();
    this.findPlayerActionDiv($('#' + userId)).show();
  },

  disableTurnForAllPlayers : function() {
    $('#main .player_action').hide();
  },

  playerBusted : function(userId) {
    // TODO talk about this with Tomo
  }

};