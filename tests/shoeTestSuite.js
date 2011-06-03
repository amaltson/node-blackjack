var Shoe = require('../scripts/shoe.js');
var testCase = require('nodeunit').testCase;

module.exports = testCase({
  setUp : function(callback) {
    shoe = new Shoe();
    callback();
  },

  'size of deck' : function(test) {
    setTimeout(function() {
      test.strictEqual(shoe.deck.length, 13, "Should be 13");
      test.done();
    }, 10);
  },

  'dealt an Ace' : function(test) {
    setTimeout(function() {
      var card = shoe.dealAce();
      var result = card.type;
      var expectedType = 'A';
      test.strictEqual(result, expectedType, "Should be " + expectedType
          + " but was " + result);
      test.done();
    }, 10);
  },

  'dealt a 2' : function(test) {
    setTimeout(function() {
      var card = shoe.dealTwo();
      var result = card.type;
      var expectedType = '2';
      test.strictEqual(result, expectedType, "Should be " + expectedType
          + " but was " + result);
      test.done();
    }, 10);
  },

  'dealt a 3' : function(test) {
    setTimeout(function() {
      var card = shoe.dealThree();
      var result = card.type;
      var expectedType = '3';
      test.strictEqual(result, expectedType, "Should be " + expectedType
          + " but was " + result);
      test.done();
    }, 10);
  },

  'dealt a 4' : function(test) {
    setTimeout(function() {
      var card = shoe.dealFour();
      var result = card.type;
      var expectedType = '4';
      test.strictEqual(result, expectedType, "Should be " + expectedType
          + " but was " + result);
      test.done();
    }, 10);
  },

  'dealt a 5' : function(test) {
    setTimeout(function() {
      var card = shoe.dealFive();
      var result = card.type;
      var expectedType = '5';
      test.strictEqual(result, expectedType, "Should be " + expectedType
          + " but was " + result);
      test.done();
    }, 10);
  },

  'dealt a 6' : function(test) {
    setTimeout(function() {
      var card = shoe.dealSix();
      var result = card.type;
      var expectedType = '6';
      test.strictEqual(result, expectedType, "Should be " + expectedType
          + " but was " + result);
      test.done();
    }, 10);
  },

  'dealt a 7' : function(test) {
    setTimeout(function() {
      var card = shoe.dealSeven();
      var result = card.type;
      var expectedType = '7';
      test.strictEqual(result, expectedType, "Should be " + expectedType
          + " but was " + result);
      test.done();
    }, 10);
  },

  'dealt an 8' : function(test) {
    setTimeout(function() {
      var card = shoe.dealEight();
      var result = card.type;
      var expectedType = '8';
      test.strictEqual(result, expectedType, "Should be " + expectedType
          + " but was " + result);
      test.done();
    }, 10);
  },

  'dealt a 9' : function(test) {
    setTimeout(function() {
      var card = shoe.dealNine();
      var result = card.type;
      var expectedType = '9';
      test.strictEqual(result, expectedType, "Should be " + expectedType
          + " but was " + result);
      test.done();
    }, 10);
  },

  'dealt a 10' : function(test) {
    setTimeout(function() {
      var card = shoe.dealTen();
      var result = card.type;
      var expectedType = '10';
      test.strictEqual(result, expectedType, "Should be " + expectedType
          + " but was " + result);
      test.done();
    }, 10);
  },

  'dealt a Jack' : function(test) {
    setTimeout(function() {
      var card = shoe.dealJack();
      var result = card.type;
      var expectedType = 'J';
      test.strictEqual(result, expectedType, "Should be " + expectedType
          + " but was " + result);
      test.done();
    }, 10);
  },

  'dealt a Queen' : function(test) {
    setTimeout(function() {
      var card = shoe.dealQueen();
      var result = card.type;
      var expectedType = 'Q';
      test.strictEqual(result, expectedType, "Should be " + expectedType
          + " but was " + result);
      test.done();
    }, 10);
  },

  'dealt a King' : function(test) {
    setTimeout(function() {
      var card = shoe.dealKing();
      var result = card.type;
      var expectedType = 'K';
      test.strictEqual(result, expectedType, "Should be " + expectedType
          + " but was " + result);
      test.done();
    }, 10);
  },

  'get a randomly card index' : function(test) {
    setTimeout(function() {
      var index = shoe.randomCardIndex(shoe.deck.length);
      test.ok(index > -1 && index < shoe.deck.length,
          "Should be between 0 and deck size but was " + index);
      test.done();
    }, 10);
  },

  'randomly dealt a card' : function(test) {
    setTimeout(function() {
      // we don't want to influence the
      // standard shoe instance
      var theOtherShoe = new Shoe();

      // replace the randomCardIndex to be not so random...
      theOtherShoe.randomCardIndex = function() {
        return 0; // this is an Ace
      };
      var card = theOtherShoe.dealNextCard();
      var result = card.type;
      var expectedType = 'A';
      test.strictEqual(result, expectedType, "Should be " + expectedType
          + " but was " + result);
      test.done();
    }, 10);
  }
});
