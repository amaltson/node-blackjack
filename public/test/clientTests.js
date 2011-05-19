// documentation on writing tests here: http://docs.jquery.com/QUnit
// example tests: https://github.com/jquery/qunit/blob/master/test/same.js

module("client tests");

test("Only 3 logs are shown", function() {
  expect(1);
  var expectedLogs = blackjackClient.maximumNumberOfLogs;
  blackjackClient.logMessage("Log 4");
  equals($('#logList li').length, 3, "Number of logs dispalyed are " + expectedLogs);
});
