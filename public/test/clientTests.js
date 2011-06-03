// documentation on writing tests here: http://docs.jquery.com/QUnit
// example tests: https://github.com/jquery/qunit/blob/master/test/same.js

module("client tests");

// the name should be unique to avoid conflicts with globally defined variables
var clientTestsData = {
  notSoRandomSuite : "c",
  currentPlayerUserId : "player_1"
};

var blackjackTestClient = new BlackjackClient();

blackjackTestClient.generateRandomSuite = function() {
  return clientTestsData.notSoRandomSuite;
};
/**
 * Tests that more than 3 logs are only displayed on the main page.
 */
test("Only 3 logs are shown", function() {
  var maximumNumberOfLogsToDisplay = blackjackTestClient.maximumNumberOfLogsToDisplay;
  var lastLog = "Log 4";
  blackjackTestClient.logMessage(lastLog);
  var actualLastLog = $('#logList li:last');
  expect(2);
  equals(actualLastLog.text(), lastLog, "Last log matches.");
  equals($('#logList li').length, maximumNumberOfLogsToDisplay, "Number of logs dispalyed are " + maximumNumberOfLogsToDisplay);
});

test("Player is assigned a card", function() {
  var cardType = "A";
  blackjackTestClient.assignCard(clientTestsData.currentPlayerUserId, cardType);
  expect(3);
  var actualCards = $('#' + clientTestsData.currentPlayerUserId + ' .cards img');
  equals(actualCards.length, 4, "Total number of cards is 4");
  var lastCard = $('#' + clientTestsData.currentPlayerUserId + ' .cards img:last');
  equals(lastCard.attr('src'), "img/" + clientTestsData.notSoRandomSuite + cardType.toLowerCase() + ".gif", "Names matched");
  equals(lastCard.attr('class'), "card_image " + "card_" + clientTestsData.notSoRandomSuite + cardType.toLowerCase(), "Card class name matched");
});

test("Hide current player's action buttons", function() {
  blackjackTestClient.hidePlayerActionButtonsForCurrentPlayer();
  expect(1);
  equals($("#main .current_player .player_action :hidden").length, 2, "Two buttons for current player are hidden");
});

test("Show current player's action buttons", function() {
  blackjackTestClient.hidePlayerActionButtonsForCurrentPlayer();
  blackjackTestClient.showPlayerActionButtonsForCurrentPlayer();
  expect(1);
  equals($("#main .current_player .player_action :visible").length, 2, "Two buttons for current player are visible");
});

test("Show dealer card", function() {
  var cardType = "3";
  blackjackTestClient.assignCard("dealer", cardType);
  expect(1);
  equals($("#main #dealer .cards img:last").attr('src'), "img_down/" + clientTestsData.notSoRandomSuite + cardType.toLowerCase() + ".gif", "Two buttons for current player are visible");
});

test("Player busted", function() {
  blackjackTestClient.playerBusted();
  expect(1);
  equals($("#main .current_player .player_action :last").attr('src'), "img/busted.png", "Busted image found");
});

test("Enable turn for a player", function() {
  var newCurrentPlayerUserId = "player_2";
  var previousPlayerUserId = clientTestsData.currentPlayerUserId;
  blackjackTestClient.enableTurnForPlayer(newCurrentPlayerUserId);
  expect(4);
  equals($("#main #" + previousPlayerUserId + " .player_action :hidden").length, 2, "Two buttons for previous player userId:" + previousPlayerUserId + " are hidden");
  equals($("#main #" + previousPlayerUserId).attr("class"), "player", "class attribute for previous player userId:" + previousPlayerUserId + " is player");
  equals($("#main #" + newCurrentPlayerUserId + " .player_action :visible").length, 2, "Two buttons for current player userId:" + newCurrentPlayerUserId + " are visible");
  equals($("#main #" + newCurrentPlayerUserId).attr("class"), "player current_player", "class attribute for current player userId:" + newCurrentPlayerUserId + " is current_player");

});

test("Remove player", function() {
  blackjackTestClient.removePlayer(clientTestsData.currentPlayerUserId);
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
  blackjackTestClient.disableTurnForAllPlayers();
  expect(1);
  equals($("#main .player_action :button:hidden").length, 4, "All player buttons are hidden");
});

test("Show result for player", function() {
  blackjackTestClient.showGameResultForPlayer(clientTestsData.currentPlayerUserId, "WIN");
  expect(1);
  equals($("#main #" + clientTestsData.currentPlayerUserId + " #result").html(), "WIN", "Player shows WIN text");
});