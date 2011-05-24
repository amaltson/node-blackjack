// documentation on writing tests here: http://docs.jquery.com/QUnit
// example tests: https://github.com/jquery/qunit/blob/master/test/same.js

module("client tests");

/**
 * Tests that more than 3 logs are only displayed on the main page.
 */
test("Only 3 logs are shown", function() {

  var maximumNumberOfLogsToDisplay = blackjackClient.maximumNumberOfLogsToDisplay;
  var lastLog = "Log 4";
  blackjackClient.logMessage(lastLog);
  var actualLastLog = $('#logList li:last');
  expect(2);
  equals(actualLastLog.text(), lastLog, "Last log matches.");
  equals($('#logList li').length, maximumNumberOfLogsToDisplay, "Number of logs dispalyed are " + maximumNumberOfLogsToDisplay);
});

test("Player is assigned a card", function() {
  var userId = "player_1";
  var cardImageName = "s01";
  blackjackClient.assignCard(userId, cardImageName);
  expect(3);
  var actualCards = $('#' + userId + ' .cards img');
  equals(actualCards.length, 4, "Total number of cards is 4");
  var lastCard = $('#' + userId + ' .cards img:last');
  equals(lastCard.attr('src'), "img/" + cardImageName + ".gif", "Names matched");
  equals(lastCard.attr('class'), "card_image", "Card class name matched");
});

test("Hide current player's action buttons", function() {
  blackjackClient.hidePlayerActionButtonsForCurrentPlayer();
  expect(1);
  equals($("#main .current_player .player_action :hidden").length, 2, "Two buttons for current player are hidden");
});

test("Show current player's action buttons", function() {
  blackjackClient.hidePlayerActionButtonsForCurrentPlayer();
  blackjackClient.showPlayerActionButtonsForCurrentPlayer();
  expect(1);
  equals($("#main .current_player .player_action :visible").length, 2, "Two buttons for current player are visible");
});
