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
    console.log(serverJsonMessage);
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
        this.disableTurnForAllPlayers();
        // break;
        // case 'hand':
        this.assignCard(player1.userId, "s07");
        this.assignCard(player2.userId, "s07");
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

  assignCard : function(userId, cardImageName) {
    $('#' + userId + ' .cards').append('<img class="card_image" src="img/' + cardImageName + '.gif" />');
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
    $('#main').remove('#' + playerUserId);
  },

  resetGame : function() {
    $('#main').empty();
  },

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
    playerDiv.addClass('player');
    playerDiv.find('.cards')
        .after('<div class="player_action"> <button type="button">Hit</button> <button type="button">Stay</button> </div> <div class="stats"> <b>win: 0 lose: 0</b> </div>');

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

  enableTurnForPlayer : function(userId) {
    this.hidePlayerActionButtonsForCurrentPlayer();
    $('#main .current_player').removeClass('current_player').addClass('player');
    $('#' + userId).removeClass('player').addClass('current_player');
    this.showPlayerActionButtonsForCurrentPlayer();
  },

  disableTurnForAllPlayers : function() {
    $('#main .player_action :button').hide();
  },

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
    // TODO
    // throw an exception that buttons weren't found
  },

  login: function(socket) {
    var maskHeight = $(document).height();
    var maskWidth = $(document).width();

    //alert(maskWidth); 

    $('#mask').css({
      'width' : maskWidth,
      'height' : maskHeight
    });
    $('#mask').fadeIn(1000);
    $('#mask').fadeTo("slow", 0.95);

    var winH = $(window).height();
    var winW = $(window).width();

    $('#login_dialog').css('top', winH / 2 - $('#login_dialog').height() / 2);
    $('#login_dialog').css('left', winW / 2 - $('#login_dialog').width() / 2);
    $('#login_dialog').fadeIn(2000);

    $('#login_button').click(function() {
      var username = $('#login_name').val();
      if(username !== 'Please enter your name') {
        $('#mask').fadeIn(1000);
        $('#mask').fadeTo("fast", 0.0);
        $('#mask').remove();
        $('#login_dialog').fadeIn(1000);
        $('#login_dialog').fadeTo("fast", 0.0);
        socket.send({
          player: {
            userId: username,
            name: username
          },
          action: 'login'
        });
      }
    });
  }
};
