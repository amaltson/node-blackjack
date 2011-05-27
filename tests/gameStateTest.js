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
      var player = {userId : 'player1', name : 'Player', hand : [{type : 'Q'},
                   {type : '4'}]};

      blackjack.addPlayer(player);
      test.equals(blackjack.getPlayer(player.userId), player, 'players equal');
      test.equals(blackjack.table.length, 1, 'player added to table');
      test.done();
    },

    'get all players' : function(test) {
      blackjack.addPlayer({userId: 'hello'}, {userId: 'hi'});
      test.equals(blackjack.getAllPlayers().length, 2, 'Got back two players');
      test.equals(blackjack.table.length, 2, 'players added to table');
      test.done();
    },

    'player turns' : function(test) {
      blackjack.addPlayer({userId: 'hello'}, {userId: 'hi'});
      test.equals(blackjack.nextTurn(), 'hello', 'first in, first player');
      test.equals(blackjack.nextTurn(), 'hi', 'second player');
      test.equals(blackjack.nextTurn(), 'hello', 'back to first');
      test.equals(blackjack.nextTurn(), 'hi', 'second player again');
      test.done();
    },

    'current turn' : function(test) {
      blackjack.addPlayer({userId: 'hello'}, {userId: 'hi'}, {userId: 'player2'});
      test.equals(blackjack.currentTurn(), 'hello', 'first person has the turn');
      blackjack.nextTurn();
      test.equals(blackjack.currentTurn(), 'hi', 'second player has a turn');
      blackjack.nextTurn();
      blackjack.nextTurn();
      test.equals(blackjack.currentTurn(), 'hello', 'back to first');
      test.done();
    }
});

