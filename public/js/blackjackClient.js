/**
 * BlackjackUI handles client socket IO.
 */
var BlackjackUI = function BlackjackUI() {
  /**
   * Maximum number of logs to display on the main page.
   */
  this.maximumNumberOfLogsToDisplay = 3;
  return this;
};

BlackjackUI.prototype = {
  processIncommingMessage : function(serverJsonMessage) {
    var jsonParsedMessage;
    console.log(serverJsonMessage);
    this.logMessage("Message recieved:" + serverJsonMessage);
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
      case 'end':
        this.disableTurnForAllPlayers();
        this.showGameResultForPlayers(serverJsonMessage.players);
      default:
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

      // see if there is a hidden card already, remove it because this is the
      // second card.
      var dealerHiddenCard = $('#dealer .cards .card_hidden').remove();
      if (dealerHiddenCard) {
        dealerHiddenCard.remove();
      }
    }

    var suiteCard = cardType;
    if (cardType !== "hidden") {
      suiteCard = this.generateRandomSuite() + cardType.toLowerCase();
    }

    $('#' + userId + ' .cards').append('<img class="card_image card_' + suiteCard + '" src="' + imageRelativePath + suiteCard + '.gif" />');
  },

  generateRandomSuite : function() {
    var randomCharacters = "cshd";
    var randomNumber = Math.floor(Math.random() * randomCharacters.length);
    return randomCharacters.substring(randomNumber, randomNumber + 1);

  },

  removePlayer : function(playerUserId) {
    $('#main #' + playerUserId).remove();
  },

  resetGame : function() {
    $('#main').empty();
  },

  addBlackjackPlayers : function(players) {
    for ( var playerIndex = 0; playerIndex < players.length; playerIndex += 1) {
      var player = players[playerIndex];
      this.addBlackjackPlayer(player.userId, player.name, player.hand);
    }
  },

  addBlackjackPlayer : function(playerUserId, playerDisplayName, hand) {
    var playerDiv = $('<div id="' + playerUserId + '"/>').addClass('player');
    playerDiv.append('<div class="name">' + playerDisplayName + '</div>');
    playerDiv.append('<div class="cards">');

    var anInstance = this;
    var hitButton = this.createHiddenButton("Hit", playerUserId, function() {
      anInstance.hit.apply(anInstance, [ playerUserId ]);
    });
    var stayButton = this.createHiddenButton("Stay", playerUserId, function() {
      anInstance.stay.apply(anInstance, [ playerUserId ]);
    });

    var playerActionDiv = $('<div class="player_action"></div>').append(hitButton).append(stayButton);
    playerDiv.append(playerActionDiv);

    $('#main').append(playerDiv);

    for ( var i = 0; i < hand.length; i++) {
      this.assignCard(playerUserId, hand[i].type);
    }
  },

  createHiddenButton : function(buttonText, playerUserId, buttonClickCallback) {
    var blackjackButton = $('<button type="button">' + buttonText + '</button>');
    blackjackButton.click(buttonClickCallback).hide();
    return blackjackButton;
  },

  enableTurnForPlayer : function(userId) {
    this.hidePlayerActionButtonsForCurrentPlayer();
    this.showTurnForPlayer(userId);
    this.showPlayerActionButtonsForCurrentPlayer();
  },

  showTurnForPlayer : function(userId) {
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
      $("#main #" + playerUserId + " .player_action").html(playerState + '!');
    }
  },

  disableTurnForAllPlayers : function() {
    $('#main .player_action :button').hide();
  },

  playerBusted : function(userId) {
    $('#' + userId + ' .player_action').html('bust!');
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
  },

  loginPrompt : function(callbackToInvokeAfterUserIdIsEntered) {
    var maskHeight = $(document).height();
    var maskWidth = $(document).width();

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

    $('.stickynotes').click(function() {
      if ($(this).hasClass('bigNotes')) {
        $(this).html($('#' + this.id + '.short').html());
        $(this).removeClass('short');
        $(this).find('a').css({
          'width' : '20em',
          'height' : '20em',
          'padding' : '1em'
        });
      } else {
        $(this).html($('#' + this.id + '.long').html());
        $(this).removeClass('long');
        $(this).find('a').css({
          'width' : '50em',
          'height' : '50em',
          'padding' : '4em'
        });
      }

      $(this).toggleClass('bigNotes');
    });
  }
};
