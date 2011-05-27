var Blackjack = require('../scripts/gameState.js');
var testCase = require('nodeunit').testCase;

module.exports = testCase({
    setUp: function (callback) {
      this.foo = 'bar';
      blackjack = new Blackjack();
      callback();
    },
    tearDown: function (callback) {
      // clean up
      callback();
    },
    'add/get player' : function(test) {
      test.expect(2);
      var player = {userId : 'player1', name : 'Player', hand : [{type : 'Q'},
                   {type : '4'}]};

      blackjack.addPlayers(player, function() {
        blackjack.getPlayer(player.userId, function(userId) {
          test.equals(userId, player, 'players equal');
        })});
      test.equals(blackjack.table.length, 1, 'player added to table');
      test.done();
    },

    'get all players' : function(test) {
      test.expect(2);
      blackjack.addPlayers({userId: 'hello'}, {userId: 'hi'}, function() {
        blackjack.getAllPlayers(function(players) {
          test.equals(players.length, 2, 'Got back two players');
        });
        test.equals(blackjack.table.length, 2, 'players added to table');
      });
      test.done();
    },

    'player turns' : function(test) {
      blackjack.addPlayers({userId: 'hello'}, {userId: 'hi'}, function() {
        blackjack.nextTurn(function(userId) {
          test.equals(userId, 'hello', 'first in, first player');
          blackjack.nextTurn(function(userId) {
            test.equals(userId, 'hi', 'second player');
            blackjack.nextTurn(function(userId) {
              test.equals(userId, 'hello', 'back to first');
              blackjack.nextTurn(function(userId) {
                test.equals(userId, 'hi', 'second player again');
              });
            });
          });
        });
      });
      test.done();
    },

    'current turn' : function(test) {
      blackjack.addPlayers({userId: 'hello'}, {userId: 'hi'}, {userId: 'player2'}, function() {
        blackjack.currentTurn(function(userId) {
          test.equals(userId, 'hello', 'first person has the turn');
          blackjack.nextTurn(function() {
            blackjack.currentTurn(function(userId) {
              test.equals(userId, 'hi', 'second player has a turn');
              blackjack.nextTurn(function() {
                blackjack.nextTurn(function() {
                  blackjack.currentTurn(function(userId) {
                    test.equals(userId, 'hello', 'back to first');
                  });
                })
              });
            });
          });
        });
      });
      test.done();
    }
});

