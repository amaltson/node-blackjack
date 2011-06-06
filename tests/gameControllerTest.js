var GameController = require('../scripts/gameController.js');
var testCase = require('nodeunit').testCase;

module.exports = testCase({
  setUp: function(callback) {
    mockSocket = {};

    mockGame = {};
    mockGame.BUSTED_VALUE = 22;
    mockGame.BLACKJACK = 21;
    mockGame.dealNextCard = function() {
      return {type:'5'};
    };
    mockGame.getPlayer = function(userId, callback) {
      callback({
        userId: 'test',
        hand: []
      });
    };

    gameController = new GameController(mockSocket, mockGame);
    callback();
  },
  tearDown: function(callback) {
    callback();
  },
  
  'player hit, regular value' : function(test) {
    test.expect(3);
    mockGame.calculateHandValue = function(hand) {
      return 19;
    };
    mockSocket.broadcast = function(jsonObject) {
      test.equal(jsonObject.userId, 'test');
      test.strictEqual(jsonObject.card.type, '5');
      test.equal(jsonObject.action, 'assignCard');
    }

    gameController.playerHit({userId:'test'});
    test.done();
  },

  'player hit and goes bust' : function(test) {
    test.expect(5);
    mockGame.calculateHandValue = function(hand) {
      return 22;
    };
    mockGame.nextTurn = function(callback) {

      // just make sure we got called.
      test.ok(true);
    }
    mockSocket.broadcast = function(jsonObject) {
      if (jsonObject.action == 'assignCard') {
        test.equal(jsonObject.userId, 'test');
        test.strictEqual(jsonObject.card.type, '5');
      }
      else {
        test.equal(jsonObject.userId, 'test');
        test.equal(jsonObject.action, 'bust');
      }
    }

    gameController.playerHit({userId:'test'});
    test.done();
  },

  'player hit and gets blackjack' : function(test) {
    test.expect(4);
    mockGame.calculateHandValue = function(hand) {
      return 21;
    };
    mockGame.nextTurn = function(callback) {
      // just make sure we got called.
      test.ok(true);
    }
    mockSocket.broadcast = function(jsonObject) {
      test.equal(jsonObject.userId, 'test');
      test.strictEqual(jsonObject.card.type, '5');
      test.equal(jsonObject.action, 'assignCard');
    }

    gameController.playerHit({userId:'test'});
    test.done();
  }
});
