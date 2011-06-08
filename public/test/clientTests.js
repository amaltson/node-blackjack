// documentation on writing tests here: http://docs.jquery.com/QUnit
// example tests: https://github.com/jquery/qunit/blob/master/test/same.js
$(document)
    .ready(function() {
      module("client tests");

      // this name should be unique to avoid conflicts with globally defined
      // variables
      var clientTestsData = {
        notSoRandomSuite : "c",
        currentPlayerUserId : "player_1",
        playerName : "test",
        hand : [ {
          type : '2'
        } ]
      };

      var testBlackjackUI = new BlackjackUI();

      testBlackjackUI.generateRandomSuite = function() {
        return clientTestsData.notSoRandomSuite;
      };

      module("UI Tests");
      /**
       * Tests that more than 3 logs are only displayed on the main page.
       */
      test("Only 3 logs are shown", function() {
        var maximumNumberOfLogsToDisplay = testBlackjackUI.maximumNumberOfLogsToDisplay;
        var lastLog = "Log 4";
        testBlackjackUI.logMessage(lastLog);
        var actualLastLog = $('#logList li:last');
        expect(2);
        equal(actualLastLog.text(), lastLog, "Last log matches.");
        equal($('#logList li').length, maximumNumberOfLogsToDisplay, "Number of logs dispalyed are " + maximumNumberOfLogsToDisplay);
      });

      test("Player is assigned a card", function() {
        var cardType = "A";
        testBlackjackUI.assignCard(clientTestsData.currentPlayerUserId, cardType);
        expect(3);
        var actualCards = $('#' + clientTestsData.currentPlayerUserId + ' .cards img');
        equal(actualCards.length, 4, "Total number of cards is 4");
        var lastCard = $('#' + clientTestsData.currentPlayerUserId + ' .cards img:last');
        equal(lastCard.attr('src'), "img/" + clientTestsData.notSoRandomSuite + cardType.toLowerCase() + ".gif", "Names matched");
        equal(lastCard.attr('class'), "card_image " + "card_" + clientTestsData.notSoRandomSuite + cardType.toLowerCase(), "Card class name matched");
      });

      test("Hide current player's action buttons", function() {
        testBlackjackUI.hidePlayerActionButtonsForCurrentPlayer();
        expect(1);
        equal($("#main .current_player .player_action :hidden").length, 2, "Two buttons for current player are hidden");
      });

      test("Show current player's action buttons", function() {
        testBlackjackUI.hidePlayerActionButtonsForCurrentPlayer();
        testBlackjackUI.showPlayerActionButtonsForCurrentPlayer();
        expect(3);
        equal($("#main .current_player .player_action :visible").length, 2, "Two buttons for current player are visible");
        equal($("#main .current_player .player_action :button:eq(0)").attr("style"), "display: inline-block; ", "Hit has dispaly: inline style");
        equal($("#main .current_player .player_action :button:eq(1)").attr("style"), "display: inline-block; ", "Stay has dispaly: inline style");

      });

      test("Show dealer card", function() {
        var cardType = "3";
        testBlackjackUI.assignCard("dealer", cardType);
        expect(1);
        equal($("#main #dealer .cards img:last").attr('src'), "img_down/" + clientTestsData.notSoRandomSuite + cardType.toLowerCase() + ".gif", "Two buttons for current player are visible");
      });

      test("Player busted", function() {
        testBlackjackUI.playerBusted(clientTestsData.currentPlayerUserId);
        expect(1);
        equal($("#main .player_action").html(), "bust!", "Busted text found");
      });

      test("Enable turn for a player", function() {
        var newCurrentPlayerUserId = "player_2";
        var previousPlayerUserId = clientTestsData.currentPlayerUserId;
        testBlackjackUI.enableTurnForPlayer(newCurrentPlayerUserId);
        expect(4);
        equal($("#main #" + previousPlayerUserId + " .player_action :hidden").length, 2, "Two buttons for previous player userId:" + previousPlayerUserId + " are hidden");
        equal($("#main #" + previousPlayerUserId).attr("class"), "player", "class attribute for previous player userId:" + previousPlayerUserId + " is player");
        equal($("#main #" + newCurrentPlayerUserId + " .player_action :visible").length, 2, "Two buttons for current player userId:" + newCurrentPlayerUserId + " are visible");
        equal($("#main #" + newCurrentPlayerUserId).attr("class"), "player current_player", "class attribute for current player userId:" + newCurrentPlayerUserId + " is current_player");

      });

      test("Remove player", function() {
        testBlackjackUI.removePlayer(clientTestsData.currentPlayerUserId);
        expect(1);
        var currentPlayerNotFound = true;
        $("#main").children().each(function() {
          var playerDiv = $(this);
          if (playerDiv.attr("id") === clientTestsData.currentPlayerUserId) {
            currentPlayerNotFound = false;
          }
        });
        ok(currentPlayerNotFound, "Current player has been removed");
      });

      test("Disable turn for all players", function() {
        testBlackjackUI.disableTurnForAllPlayers();
        expect(1);
        equal($("#main .player_action :button:hidden").length, 4, "All player buttons are hidden");
      });

      test("Show result for player", function() {
        testBlackjackUI.showGameResultForPlayer(clientTestsData.currentPlayerUserId, "WIN");
        expect(1);
        equal($("#main #" + clientTestsData.currentPlayerUserId + " .player_action").html(), "WIN!", "Player shows WIN text");
      });

      test("Create new blackjack player", function() {
        var anotherTestBlackjackUI = new BlackjackUI();
        anotherTestBlackjackUI.addBlackjackPlayer(clientTestsData.playerName, clientTestsData.playerName, clientTestsData.hand);
        anotherTestBlackjackUI.hit = function() {
          ok(true, "Hit button setup for clicks");
        };
        anotherTestBlackjackUI.stay = function() {
          ok(true, "Stay button setup for clicks");
        };
        expect(7);
        equal($("#main #" + clientTestsData.playerName + " .name").length, 1, "Player name div exists");
        equal($("#main #" + clientTestsData.playerName + " .cards").length, 1, "Player cards div exists");
        equal($("#main #" + clientTestsData.playerName + " .cards").children().length, 1, "Player has one card");
        equal($("#main #" + clientTestsData.playerName + " .player_action").length, 1, "Player action div exists");
        equal($("#main #" + clientTestsData.playerName + " .player_action :button:hidden").length, 2, "Player has two hidden buttons");
        $("#main #" + clientTestsData.playerName + " .player_action :button:contains('Hit')").click();
        $("#main #" + clientTestsData.playerName + " .player_action :button:contains('Stay')").click();
      });
    });

$(document).ready(function() {
  module("Mock socket IO Tests");
  // this name should be unique to avoid conflicts with globally defined
  // variables
  var clientTestsData = {
    notSoRandomSuite : "c",
    currentPlayerUserId : "player_1",
    playerName : "test",
    hand : [ {
      type : '2'
    } ]
  };
  var mockSocket = {};
  var testBlackjackUIForSocketIO = new BlackjackUI();
  var testBlackjackSocketIOClient = new BlackjackSocketIOClient(mockSocket, testBlackjackUIForSocketIO);

  test("Test send hit message", function() {
    mockSocket.send = function(jsonObject) {
      equal(jsonObject.userId, clientTestsData.currentPlayerUserId, "Correct user Id in server message");
      equal(jsonObject.action, "hit", "Correct action in server message");
    };
    expect(2);
    testBlackjackUIForSocketIO.hit(clientTestsData.currentPlayerUserId);
  });

  test("Test send stay message", function() {
    mockSocket.send = function(jsonObject) {
      equal(jsonObject.userId, clientTestsData.currentPlayerUserId, "Correct user Id in server message");
      equal(jsonObject.action, "stay", "Correct action in server message");
    };
    expect(2);
    testBlackjackUIForSocketIO.stay(clientTestsData.currentPlayerUserId);
  });

  test("Test hit message is sent when user clicks the hit button", function() {
    testBlackjackUIForSocketIO.addBlackjackPlayer(clientTestsData.playerName, clientTestsData.playerName, clientTestsData.hand);
    expect(2);
    mockSocket.send = function(jsonObject) {
      equal(jsonObject.userId, clientTestsData.playerName, "Correct user Id in server message");
      equal(jsonObject.action, "hit", "Correct action in server message");
    };
    $("#main #" + clientTestsData.playerName + " .player_action :button:contains('Hit')").click();
  });

  test("Test stay message is sent when user clicks the stay button", function() {
    testBlackjackUIForSocketIO.addBlackjackPlayer(clientTestsData.playerName, clientTestsData.playerName, clientTestsData.hand);
    expect(2);
    mockSocket.send = function(jsonObject) {
      equal(jsonObject.userId, clientTestsData.playerName, "Correct user Id in server message");
      equal(jsonObject.action, "stay", "Correct action in server message");
    };
    $("#main #" + clientTestsData.playerName + " .player_action :button:contains('Stay')").click();
  });
});