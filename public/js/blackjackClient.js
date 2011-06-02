/* Author: Ahmed Javed 
 */

var BlackjackClient = function Blackjack() {
  /**
   * Socket io connection.
   */
  this.socket = "",

  /**
   * Maximum number of logs to display on the main page.
   */
  this.maximumNumberOfLogsToDisplay = 3;
  return this;
};

BlackjackClient.prototype = {
  processIncommingMessage : function(serverJsonMessage) {
    var jsonParsedMessage;
    console.log(serverJsonMessage);
    this.logMessage("Message recieved:" + serverJsonMessage);
    // try {
    // jsonParsedMessage = JSON.parse(message);
    // } catch (SyntaxError) {
    // console.log('Invalid JSON: '+serverJsonMessage);
    // might to be the best way but ok for now
    // return;
    // }
    // switch (jsonParsedMessage.event) {
    switch (serverJsonMessage.action) {
      case 'start':
        this.resetGame();
        this.addBlackjackPlayers(serverJsonMessage.players);
        break;
      case 'add':
        var player = serverJsonMessage.player;
        this.addBlackjackPlayer(player.userId, player.name, player.hand);
        break;
      case 'remove':
        this.removePlayer(serverJsonMessage.userId);
        break;
      case 'turn':
        this.enableTurnForPlayer(serverJsonMessage.userId);
        break;
      case 'currentTurn':
        this.showTurnForPlayer(serverJsonMessage.userId);
        break;
      case 'assignCard':
        this.assignCard(serverJsonMessage.userId, serverJsonMessage.card.type);
        break;
      case 'bust':
        this.playerBusted(serverJsonMessage.userId);
        break;
      // TODO arthur will finish implementation for handling end event
      // above default
      // case 'end':
      // this.disableTurnForAllPlayers();
      // this.showGameResultForPlayers(players);
      default:
        // break;
        // case 'showDealerCard':
        // break;
        // case 'assingCard':
        // this.assignCard("dealer", "A");
        // this.assignCard("dealer", "hidden");
        var aBlackjackClientInstance = this;
        setTimeout(function() {
          aBlackjackClientInstance.showDealerCard.apply(aBlackjackClientInstance, [ "10" ]);
        }, 5000);
        // break;

        // this.enableTurnForPlayer(player2.userId);
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

  assignCard : function(userId, cardType) {
    var imageRelativePath = "img/";
    if (userId === "dealer") {
      imageRelativePath = "img_down/";
      
      // get the number of cards the dealer has
      var dealerNumCards = $('#dealer .cards').children().size();
    }

    var suiteCard = cardType;
    if (cardType !== "hidden") {
      suiteCard = this.generateRandomSuite() + cardType.toLowerCase();
    }

    // if it's the second card for the dealer, we need to show the card.
    if (userId === "dealer" && dealerNumCards > 2) {
      $('#dealer .cards .card_hidden').remove();
    }
    $('#' + userId + ' .cards').append('<img class="card_image card_' + suiteCard + '" src="' + imageRelativePath + suiteCard + '.gif" />');
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

  removePlayer : function(playerUserId) {
    $('#main #' + playerUserId).remove();
  },

  // TODO write a test for resetGame
  resetGame : function() {
    $('#main').empty();
  },

  // TODO write a test for addBlackjackPlayers
  addBlackjackPlayers : function(players) {
    for ( var playerIndex = 0; playerIndex < players.length; playerIndex += 1) {
      var player = players[playerIndex];
      this.addBlackjackPlayer(player.userId, player.name, player.hand);
    }
  },

  createPlayerDiv : function(divId, displayName) {
    var playerDiv = $('<div id="' + divId + '"/>');
    playerDiv.append('<div class="turn_indicator">&nbsp;</div>');
    playerDiv.append('<div class="name">' + displayName + '</div>');
    playerDiv.append('<div class="cards">');
    return playerDiv;
  },

  // TODO write a test for addBlackjackPlayer
  addBlackjackPlayer : function(playerUserId, playerDisplayName, hand) {
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
      aBlackjackClientInstance.hidePlayerActionButtonsForCurrentPlayer();
    });
    stayButton.hide();
    $('#main').append(playerDiv);

    for ( var i = 0; i < hand.length; i++) {
      this.assignCard(playerUserId, hand[i].type);
    }
  },

  enableTurnForPlayer : function(userId) {
    this.hidePlayerActionButtonsForCurrentPlayer();
    this.showTurnForPlayer(userId);
    this.showPlayerActionButtonsForCurrentPlayer();
  },

  showTurnForPlayer: function(userId) {
    this.hidePlayerActionButtonsForCurrentPlayer();
    $('#main .current_player').removeClass('current_player');
    $('#' + userId).addClass('current_player');
  },

  showGameResultForPlayers : function(players) {
    for ( var playerIndex = 0; playerIndex < players.length; playerIndex += 1) {
      var player = players[playerIndex];
      this.showGameResultForPlayer(player.userId, player.state);
    }
  },

  showGameResultForPlayer : function(playerUserId, playerState) {
    var bustedImage = $("#main #" + playerUserId + " .player_action :image");
    if (bustedImage.length === 0) {
      $("#main #" + playerUserId + " .player_action").append('<div id="result">' + playerState + '</div>');
    }
  },

  disableTurnForAllPlayers : function() {
    $('#main .player_action :button').hide();
  },

  playerBusted : function(userId) {
    $('#' + userId + ' .player_action').append('<img class="busted_image" src="img/busted.png" />');
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
    // TODO
    // throw an exception that buttons weren't found
  },

  // TODO test loginPrompt
  loginPrompt : function(callbackToInvokeAfterUserIdIsEntered) {
    var maskHeight = $(document).height();
    var maskWidth = $(document).width();

    // alert(maskWidth);

    $('#mask').css({
      'width' : maskWidth,
      'height' : maskHeight
    });
    $('#mask').css('display', 'block');

    var winH = $(window).height();
    var winW = $(window).width();

    $('#login_dialog').css('top', winH / 2 - $('#login_dialog').height() / 2);
    $('#login_dialog').css('left', winW / 2 - $('#login_dialog').width() / 2);
    $('#login_dialog').css('display', 'block');

    var login = function() {
      var username = $('#login_name').val();
      if (username !== 'Please enter your name') {
        $('#mask').fadeIn(1000);
        $('#mask').fadeTo("fast", 0.0);
        $('#mask').remove();
        $('#login_dialog').remove();
        callbackToInvokeAfterUserIdIsEntered(username);
      }
    };

    $('#login_button').click(function() {
      login();
    });
    $('#login_dialog').keypress(function(event) {
      if (event.which == '13') {
        login();
      }
    });
  }
};
