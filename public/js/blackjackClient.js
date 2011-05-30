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
var player3 = {
  userId : "player_3",
  name : "Player 3"
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
        this.disableTurnForAllPlayers();
        // break;
        // case 'showDealerCard':
        // break;
        // case 'assingCard':
        this.assignCard("dealer", "A");
        this.assignCard("dealer", "hidden");
        this.assignCard(player1.userId, "2");
        this.assignCard(player2.userId, "10");
        this.assignCard(player2.userId, "Q");
        var aBlackjackClientInstance = this;
        setTimeout(function() {
          aBlackjackClientInstance.showDealerCard.apply(aBlackjackClientInstance, [ "10" ]);
        }, 5000);
        // break;
        // case 'turn':
        this.enableTurnForPlayer(player1.userId);
        // case 'remove':
        // this.removePlayer(player1.userId);
        // break;
        // case 'add':
        this.addBlackjackPlayer(player3.userId, player3.name);
        // break;
        // case 'bust':
        this.playerBusted();
        this.enableTurnForPlayer(player2.userId);
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

  // tested
  assignCard : function(userId, cardType) {
    var imageRelativePath = "img/";
    if (userId === "dealer") {
      imageRelativePath = "img_down/";
    }

    var suiteCard = cardType;
    if (cardType !== "hidden") {
      suiteCard = this.generateRandomSuite() + cardType.toLowerCase();
    }

    $('#' + userId + ' .cards').append('<img class="card_image" src="' + imageRelativePath + suiteCard + '.gif" />');
  },

  showDealerCard : function(cardType) {
    $('#dealer .cards').children().eq(1).remove();
    this.assignCard("dealer", cardType);
  },

  generateRandomSuite : function() {
    var randomCharacters = "cshd";
    var randomNumber = Math.floor(Math.random() * randomCharacters.length);
    return randomCharacters.substring(randomNumber, randomNumber + 1);

  },

  // TODO write a test for hit
  hit : function(playerUserId) {
    console.log(playerUserId + " pressed hit");
    this.socket.send({
      userId : playerUserId,
      action : "hit"
    });
  },

  // TODO write a test for stay
  stay : function(playerUserId) {
    console.log(playerUserId + " pressed stay");
    this.socket.send({
      userId : playerUserId,
      action : "stay"
    });
  },

  // TODO write a test for remove player
  removePlayer : function(playerUserId) {
    $('#main').remove('#' + playerUserId);
  },

  // TODO write a test for resetGame
  resetGame : function() {
    $('#main').empty();
  },

  // TODO write a test for addDealerAndBlackjackPlayers
  addDealerAndBlackjackPlayers : function(players) {
    this.addDealer();

    for ( var playerIndex = 0; playerIndex < players.length; playerIndex += 1) {
      var player = players[playerIndex];
      this.addBlackjackPlayer(player.userId, player.name);
    }
  },

  // TODO write a test for addDealer
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

  // TODO write a test for addBlackjackPlayer
  addBlackjackPlayer : function(playerUserId, playerDisplayName) {
    var aBlackjackClientInstance = this;

    var playerDiv = aBlackjackClientInstance.createPlayerDiv(playerUserId, playerDisplayName);
    playerDiv.addClass('player');
    playerDiv
        .find('.cards')
        .after('<div class="player_action"> <button type="button">Hit</button> <button type="button">Stay</button> </div> <div class="stats" style="display:none;"> <b>win: 0 lose: 0</b> </div>');

    var playerActionDiv = playerDiv.find('.player_action');
    var hitButton = playerActionDiv.find(':button:first');
    hitButton.click(function() {
      aBlackjackClientInstance.hit.apply(aBlackjackClientInstance, [ playerUserId ]);
    });
    hitButton.hide();
    var stayButton = playerActionDiv.find(':button:last');
    stayButton.click(function() {
      aBlackjackClientInstance.stay.apply(aBlackjackClientInstance, [ playerUserId ]);
    });
    stayButton.hide();
    $('#main').append(playerDiv);
  },

  // TODO write a test for enableTurnForPlayer
  enableTurnForPlayer : function(userId) {
    this.hidePlayerActionButtonsForCurrentPlayer();
    $('#main .current_player').removeClass('current_player').addClass('player');
    $('#' + userId).removeClass('player').addClass('current_player');
    this.showPlayerActionButtonsForCurrentPlayer();
  },

  // TODO write a test for disableTurnForAllPlayers
  disableTurnForAllPlayers : function() {
    $('#main .player_action :button').hide();
  },

  // TODO write a test for playerBusted
  playerBusted : function() {
    this.hidePlayerActionButtonsForCurrentPlayer();
    $('#main .current_player .player_action').append('<img class="busted_image" src="img/busted.png" />');
  },

  hidePlayerActionButtonsForCurrentPlayer : function() {
    this.togglePlayerActionButtonsForCurrentPlayer(false);
  },

  showPlayerActionButtonsForCurrentPlayer : function() {
    this.togglePlayerActionButtonsForCurrentPlayer(true);
  },

  togglePlayerActionButtonsForCurrentPlayer : function(show) {
    var currentPlayerActionButtons = $('#main').find('.current_player :button');
    if (currentPlayerActionButtons.length > 0) {
      if (show) {
        currentPlayerActionButtons.show();
      } else {
        currentPlayerActionButtons.hide();
      }
    }
  }

};