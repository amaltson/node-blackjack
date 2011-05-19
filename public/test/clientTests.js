// documentation on writing tests here: http://docs.jquery.com/QUnit
// example tests: https://github.com/jquery/qunit/blob/master/test/same.js

module("client tests");

/**
 * Tests that more than 3 logs are only displayed on the main page.
 */
test("Only 3 logs are shown", function() {
  expect(1);
  var maximumNumberOfLogsToDisplay = blackjackClient.maximumNumberOfLogsToDisplay;
  blackjackClient.logMessage("Log 4");
  equals($('#logList li').length, maximumNumberOfLogsToDisplay, "Number of logs dispalyed are " + maximumNumberOfLogsToDisplay);
});
