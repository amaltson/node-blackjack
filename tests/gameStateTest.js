var Blackjack = require('../scripts/game.js');
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

    'delete player' : function(test) {
      test.expect(4);
      blackjack.addPlayers({userId: 'hello'}, {userId: 'hi'}, function() {
        blackjack.removePlayer('hello', function() {
          test.equals(blackjack.table.length, 1, 'removed from table');
          test.equals(blackjack.table[0], 'hi', 'hi remains');
          blackjack.getAllPlayers(function(players) {
            test.equals(players.length, 1, 'removed player');
            test.equals(players[0].userId, 'hi', 'hi remains');
          });
        });
      });
      test.done();
    },

    'player turns' : function(test) {
      blackjack.addPlayers({userId: 'hello'}, {userId: 'hi'}, function() {
        blackjack.nextTurn(function(userId) {
          test.equals(userId, 'hi', 'first in, first player');
          blackjack.nextTurn(function(userId) {
            test.equals(userId, 'hello', 'second player');
            blackjack.nextTurn(function(userId) {
              test.equals(userId, 'hi', 'back to first');
              blackjack.nextTurn(function(userId) {
                test.equals(userId, 'hello', 'second player again');
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
    },

    'turn and remove' : function(test) {
      test.expect(2);
      blackjack.addPlayers({userId: 'hello'}, {userId: 'hi'}, function() {
        blackjack.nextTurn(function() {
          blackjack.removePlayer('hi', function() {
            blackjack.currentTurn(function(userId) {
              test.equals(userId, 'hello', 'Just the first player remaining');
              blackjack.nextTurn(function(userId) {
                test.equals(userId, 'hello', 'Just the first player remaining');
              });
            });
          });
        });
      });
      test.done();
    },

    'deal next card' : function(test) {
      var card = blackjack.dealNextCard();
      var re = /^(\d|10|J|Q|K|A)$/
      test.ok(re.exec(card.type), 'next card returned a valid card');
      test.done();
    }
});

