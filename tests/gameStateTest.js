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
      test.done();
    },

    'get all players' : function(test) {
      blackjack.addPlayer({userId: 'hello'}, {userId: 'hi'});
      test.equals(blackjack.getAllPlayers().length, 2, 'Got back two players');
      test.done();
    },
});

