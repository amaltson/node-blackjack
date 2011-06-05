var HandValueCalculator = require('../scripts/handValueCalculator.js');
var Shoe = require('../scripts/shoe.js');
var testCase = require('nodeunit').testCase;

module.exports = testCase({
  setUp : function(callback) {
    calculator = new HandValueCalculator();
    shoe = new Shoe();
    callback();
  },

  'calculateHandValue with null argument' : function(test) {
    setTimeout(
        function() {
          test.strictEqual(calculator.calculateHandValue(), 0,
              "Should be 0");
          test.done();
        }, 10);
  },
  'calculateHandValue with empty collection' : function(test) {
    setTimeout(function() {
      test.strictEqual(calculator.calculateHandValue([]), 0,
          "Should be 0");
      test.done();
    }, 10);
  },
  'calculateHandValue with a single ace' : function(test) {
    setTimeout(function() {
      var aCard = shoe.dealAce();
      var aHand = [ aCard ];
      var aValue = calculator.calculateHandValue(aHand);
      test.strictEqual(aValue, 11, "Should be 11 but was "
          + aValue.toString());
      test.done();
    }, 10);
  },
  'calculateHandValue with a single 2' : function(test) {
    setTimeout(function() {
      var aCard = shoe.dealTwo();
      var aHand = [ aCard ];
      var aValue = calculator.calculateHandValue(aHand);
      test.strictEqual(aValue, 2, "Should be 2 but was "
          + aValue.toString());
      test.done();
    }, 10);
  },
  'calculateHandValue with a single 3' : function(test) {
    setTimeout(function() {
      var aCard = shoe.dealThree();
      var aHand = [ aCard ];
      var aValue = calculator.calculateHandValue(aHand);
      test.strictEqual(aValue, 3, "Should be 3 but was "
          + aValue.toString());
      test.done();
    }, 10);
  },
  'calculateHandValue with a single 4' : function(test) {
    setTimeout(function() {
      var aCard = shoe.dealFour();
      var aHand = [ aCard ];
      var aValue = calculator.calculateHandValue(aHand);
      test.strictEqual(aValue, 4, "Should be 4 but was "
          + aValue.toString());
      test.done();
    }, 10);
  },
  'calculateHandValue with a single 5' : function(test) {
    setTimeout(function() {
      var aCard = shoe.dealFive();
      var aHand = [ aCard ];
      var aValue = calculator.calculateHandValue(aHand);
      test.strictEqual(aValue, 5, "Should be 5 but was "
          + aValue.toString());
      test.done();
    }, 10);
  },
  'calculateHandValue with a single 6' : function(test) {
    setTimeout(function() {
      var aCard = shoe.dealSix();
      var aHand = [ aCard ];
      var aValue = calculator.calculateHandValue(aHand);
      test.strictEqual(aValue, 6, "Should be 6 but was "
          + aValue.toString());
      test.done();
    }, 10);
  },
  'calculateHandValue with a single 7' : function(test) {
    setTimeout(function() {
      var aCard = shoe.dealSeven();
      var aHand = [ aCard ];
      var aValue = calculator.calculateHandValue(aHand);
      test.strictEqual(aValue, 7, "Should be 7 but was "
          + aValue.toString());
      test.done();
    }, 10);
  },
  'calculateHandValue with a single 8' : function(test) {
    setTimeout(function() {
      var aCard = shoe.dealEight();
      var aHand = [ aCard ];
      var aValue = calculator.calculateHandValue(aHand);
      test.strictEqual(aValue, 8, "Should be 8 but was "
          + aValue.toString());
      test.done();
    }, 10);
  },
  'calculateHandValue with a single 9' : function(test) {
    setTimeout(function() {
      var aCard = shoe.dealNine();
      var aHand = [ aCard ];
      var aValue = calculator.calculateHandValue(aHand);
      test.strictEqual(aValue, 9, "Should be 9 but was "
          + aValue.toString());
      test.done();
    }, 10);
  },
  'calculateHandValue with a single 10' : function(test) {
    setTimeout(function() {
      var aCard = shoe.dealTen();
      var aHand = [ aCard ];
      var aValue = calculator.calculateHandValue(aHand);
      test.strictEqual(aValue, 10, "Should be 10 but was "
          + aValue.toString());
      test.done();
    }, 10);
  },
  'calculateHandValue with a single jack' : function(test) {
    setTimeout(function() {
      var aCard = shoe.dealJack();
      var aHand = [ aCard ];
      var aValue = calculator.calculateHandValue(aHand);
      test.strictEqual(aValue, 10, "Should be 10 but was "
          + aValue.toString());
      test.done();
    }, 10);
  },
  'calculateHandValue with a single queen' : function(test) {
    setTimeout(function() {
      var aCard = shoe.dealQueen();
      var aHand = [ aCard ];
      var aValue = calculator.calculateHandValue(aHand);
      test.strictEqual(aValue, 10, "Should be 10 but was "
          + aValue.toString());
      test.done();
    }, 10);
  },
  'calculateHandValue with a single king' : function(test) {
    setTimeout(function() {
      var aCard = shoe.dealKing();
      var aHand = [ aCard ];
      var aValue = calculator.calculateHandValue(aHand);
      test.strictEqual(aValue, 10, "Should be 10 but was "
          + aValue.toString());
      test.done();
    }, 10);
  },
  'calculateHandValue with two aces' : function(test) {
    setTimeout(function() {
      var aCard = shoe.dealAce();
      var aHand = [ aCard, aCard ];
      var aValue = calculator.calculateHandValue(aHand);
      test.strictEqual(aValue, 12, "Should be 12 but was "
          + aValue.toString());
      test.done();
    }, 10);
  },
  'calculateHandValue with an ace and a 2 (the lowest number card)' : function(
      test) {
    setTimeout(function() {
      var aCard = shoe.dealAce();
      var anotherCard = shoe.dealTwo();
      var aHand = [ aCard, anotherCard ];
      var aValue = calculator.calculateHandValue(aHand);
      test.strictEqual(aValue, 13, "Should be 13 but was "
          + aValue.toString());
      test.done();
    }, 10);
  },
  'calculateHandValue with an ace and a 9 (the highest number card not equal to 21)' : function(
      test) {
    setTimeout(function() {
      var aCard = shoe.dealAce();
      var anotherCard = shoe.dealNine();
      var aHand = [ aCard, anotherCard ];
      var aValue = calculator.calculateHandValue(aHand);
      test.strictEqual(aValue, 20, "Should be 20 but was "
          + aValue.toString());
      test.done();
    }, 10);
  },
  'calculateHandValue with an ace and a 10' : function(test) {
    setTimeout(function() {
      var aCard = shoe.dealAce();
      var anotherCard = shoe.dealTen();
      var aHand = [ aCard, anotherCard ];
      var aValue = calculator.calculateHandValue(aHand);
      test.strictEqual(aValue, 21, "Should be 21 but was "
          + aValue.toString());
      test.done();
    }, 10);
  },
  'calculateHandValue with an ace and a face card (J,Q,K)' : function(test) {
    setTimeout(function() {
      var aCard = shoe.dealAce();
      var anotherCard = shoe.dealQueen();
      var aHand = [ aCard, anotherCard ];
      var aValue = calculator.calculateHandValue(aHand);
      test.strictEqual(aValue, 21, "Should be 21 but was "
          + aValue.toString());
      test.done();
    }, 10);
  },
  'calculateHandValue with 3 aces' : function(test) {
    setTimeout(function() {
      var aCard = shoe.dealAce();
      var aHand = [ aCard, aCard, aCard ];
      var aValue = calculator.calculateHandValue(aHand);
      test.strictEqual(aValue, 13, "Should be 13 but was "
          + aValue.toString());
      test.done();
    }, 10);
  },
  'calculateHandValue with value over 21' : function(test) {
    setTimeout(function() {
      var aCard = shoe.dealTen();
      var anotherCard = shoe.dealKing();
      var aThirdCard = shoe.dealTwo();
      var aHand = [ aCard, anotherCard, aThirdCard ];
      var aValue = calculator.calculateHandValue(aHand);
      test.strictEqual(aValue, 22,
          "Should be 22 (busted constant value) but was "
              + aValue.toString());
      test.done();
    }, 10);
  },
  'calculateHandValue with way busted value over 21' : function(test) {
    setTimeout(function() {
      var aCard = shoe.dealJack();
      var anotherCard = shoe.dealQueen();
      var aThirdCard = shoe.dealKing();
      var aHand = [ aCard, anotherCard, aThirdCard ];
      var aValue = calculator.calculateHandValue(aHand);
      test.strictEqual(aValue, 22,
          "Should be 22 (busted constant value) but was "
              + aValue.toString());
      test.done();
    }, 10);
  },
  'calculateHandValue with 11 aces' : function(test) {
    setTimeout(function() {
      var aCard = shoe.dealAce();
      var aHand = [ aCard, aCard, aCard, aCard, aCard, aCard, aCard,
          aCard, aCard, aCard, aCard ];
      var aValue = calculator.calculateHandValue(aHand);
      test.strictEqual(aValue, 21, "Should be 21 but was "
          + aValue.toString());
      test.done();
    }, 10);
  },
  'calculateHandValue with ace first order' : function(test) {
    setTimeout(function() {
      var aCard = shoe.dealAce();
      var anotherCard = shoe.dealSix();
      var aThirdCard = shoe.dealFive();
      var aHand = [ aCard, anotherCard, aThirdCard ];
      var aValue = calculator.calculateHandValue(aHand);
      test.strictEqual(aValue, 12, "Should be 12 but was "
          + aValue.toString());
      test.done();
    }, 10);
  },
  'calculateHandValue with ace last order' : function(test) {
    setTimeout(function() {
      var aCard = shoe.dealFive();
      var anotherCard = shoe.dealSix();
      var aThirdCard = shoe.dealAce();
      var aHand = [ aCard, anotherCard, aThirdCard ];
      var aValue = calculator.calculateHandValue(aHand);
      test.strictEqual(aValue, 12, "Should be 12 but was "
          + aValue.toString());
      test.done();
    }, 10);
  },
  
  // ---- Determine Winner tests ---- 
  'player bust' : function(test) {
    test.equals(calculator.determinePlayerWin(19, calculator.BUSTED_VALUE), 'bust');
    test.done();
  },
  'player win' : function(test) {
    test.equals(calculator.determinePlayerWin(17, 19), 'win');
    // win because dealer busted.
    test.equals(calculator.determinePlayerWin(calculator.BUSTED_VALUE, 14), 'win');
    test.done();
  },
  'player tie' : function(test) {
    // regular tie
    test.equals(calculator.determinePlayerWin(16, 16), 'tie');
    // 21 tie
    test.equals(calculator.determinePlayerWin(calculator.BLACKJACK, calculator.BLACKJACK), 'tie');
    // both bust
    test.equals(calculator.determinePlayerWin(calculator.BUSTED_VALUE, calculator.BUSTED_VALUE), 'tie');
    test.done();
  },
  'player lose' : function(test) {
    test.equals(calculator.determinePlayerWin(calculator.BLACKJACK, 20), 'lose');
    test.done();
  }
});
