var Blackjack = require('../scripts/game.js');
var testCase = require('nodeunit').testCase;

module.exports = testCase({
	setUp : function(callback) {
		blackjack = new Blackjack();
		callback();
	},

	'calculateHandValue with null argument' : function(test) {
		setTimeout(function() {
			test.strictEqual(blackjack.calculateHandValue(), 0, "Should be 0");
			test.done();
		}, 10);
	},
	'calculateHandValue with empty collection' : function(test) {
		setTimeout(function() {
			test
					.strictEqual(blackjack.calculateHandValue([]), 0,
							"Should be 0");
			test.done();
		}, 10);
	},
	'calculateHandValue with a single ace' : function(test) {
		setTimeout(function() {
			var aCard = blackjack.shoe.dealAce();
			var aHand = [ aCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 11, "Should be 11 but was "
					+ aValue.toString());
			test.done();
		}, 10);
	},
	'calculateHandValue with a single 2' : function(test) {
		setTimeout(function() {
			var aCard = blackjack.shoe.dealTwo();
			var aHand = [ aCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 2, "Should be 2 but was "
					+ aValue.toString());
			test.done();
		}, 10);
	},
	'calculateHandValue with a single 3' : function(test) {
		setTimeout(function() {
			var aCard = blackjack.shoe.dealThree();
			var aHand = [ aCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 3, "Should be 3 but was "
					+ aValue.toString());
			test.done();
		}, 10);
	},
	'calculateHandValue with a single 4' : function(test) {
		setTimeout(function() {
			var aCard = blackjack.shoe.dealFour();
			var aHand = [ aCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 4, "Should be 4 but was "
					+ aValue.toString());
			test.done();
		}, 10);
	},
	'calculateHandValue with a single 5' : function(test) {
		setTimeout(function() {
			var aCard = blackjack.shoe.dealFive();
			var aHand = [ aCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 5, "Should be 5 but was "
					+ aValue.toString());
			test.done();
		}, 10);
	},
	'calculateHandValue with a single 6' : function(test) {
		setTimeout(function() {
			var aCard = blackjack.shoe.dealSix();
			var aHand = [ aCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 6, "Should be 6 but was "
					+ aValue.toString());
			test.done();
		}, 10);
	},
	'calculateHandValue with a single 7' : function(test) {
		setTimeout(function() {
			var aCard = blackjack.shoe.dealSeven();
			var aHand = [ aCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 7, "Should be 7 but was "
					+ aValue.toString());
			test.done();
		}, 10);
	},
	'calculateHandValue with a single 8' : function(test) {
		setTimeout(function() {
			var aCard = blackjack.shoe.dealEight();
			var aHand = [ aCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 8, "Should be 8 but was "
					+ aValue.toString());
			test.done();
		}, 10);
	},
	'calculateHandValue with a single 9' : function(test) {
		setTimeout(function() {
			var aCard = blackjack.shoe.dealNine();
			var aHand = [ aCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 9, "Should be 9 but was "
					+ aValue.toString());
			test.done();
		}, 10);
	},
	'calculateHandValue with a single 10' : function(test) {
		setTimeout(function() {
			var aCard = blackjack.shoe.dealTen();
			var aHand = [ aCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 10, "Should be 10 but was "
					+ aValue.toString());
			test.done();
		}, 10);
	},
	'calculateHandValue with a single jack' : function(test) {
		setTimeout(function() {
			var aCard = blackjack.shoe.dealJack();
			var aHand = [ aCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 10, "Should be 10 but was "
					+ aValue.toString());
			test.done();
		}, 10);
	},
	'calculateHandValue with a single queen' : function(test) {
		setTimeout(function() {
			var aCard = blackjack.shoe.dealQueen();
			var aHand = [ aCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 10, "Should be 10 but was "
					+ aValue.toString());
			test.done();
		}, 10);
	},
	'calculateHandValue with a single king' : function(test) {
		setTimeout(function() {
			var aCard = blackjack.shoe.dealKing();
			var aHand = [ aCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 10, "Should be 10 but was "
					+ aValue.toString());
			test.done();
		}, 10);
	},
	'calculateHandValue with two aces' : function(test) {
		setTimeout(function() {
			var aCard = blackjack.shoe.dealAce();
			var aHand = [ aCard, aCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 12, "Should be 12 but was "
					+ aValue.toString());
			test.done();
		}, 10);
	},
	'calculateHandValue with an ace and a 2 (the lowest number card)' : function(
			test) {
		setTimeout(function() {
			var aCard = blackjack.shoe.dealAce();
			var anotherCard = blackjack.shoe.dealTwo();
			var aHand = [ aCard, anotherCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 13, "Should be 13 but was "
					+ aValue.toString());
			test.done();
		}, 10);
	},
	'calculateHandValue with an ace and a 9 (the highest number card not equal to 21)' : function(
			test) {
		setTimeout(function() {
			var aCard = blackjack.shoe.dealAce();
			var anotherCard = blackjack.shoe.dealNine();
			var aHand = [ aCard, anotherCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 20, "Should be 20 but was "
					+ aValue.toString());
			test.done();
		}, 10);
	},
	'calculateHandValue with an ace and a 10' : function(test) {
		setTimeout(function() {
			var aCard = blackjack.shoe.dealAce();
			var anotherCard = blackjack.shoe.dealTen();
			var aHand = [ aCard, anotherCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 21, "Should be 21 but was "
					+ aValue.toString());
			test.done();
		}, 10);
	},
	'calculateHandValue with an ace and a face card (J,Q,K)' : function(test) {
		setTimeout(function() {
			var aCard = blackjack.shoe.dealAce();
			var anotherCard = blackjack.shoe.dealQueen();
			var aHand = [ aCard, anotherCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 21, "Should be 21 but was "
					+ aValue.toString());
			test.done();
		}, 10);
	},
	'calculateHandValue with 3 aces' : function(test) {
		setTimeout(function() {
			var aCard = blackjack.shoe.dealAce();
			var aHand = [ aCard, aCard, aCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 13, "Should be 13 but was "
					+ aValue.toString());
			test.done();
		}, 10);
	},
	'calculateHandValue with value over 21' : function(test) {
		setTimeout(function() {
			var aCard = blackjack.shoe.dealTen();
			var anotherCard = blackjack.shoe.dealKing();
			var aThirdCard = blackjack.shoe.dealTwo();
			var aHand = [ aCard, anotherCard, aThirdCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 22,
					"Should be 22 (busted constant value) but was "
							+ aValue.toString());
			test.done();
		}, 10);
	},
	'calculateHandValue with way busted value over 21' : function(test) {
		setTimeout(function() {
			var aCard = blackjack.shoe.dealJack();
			var anotherCard = blackjack.shoe.dealQueen();
			var aThirdCard = blackjack.shoe.dealKing();
			var aHand = [ aCard, anotherCard, aThirdCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 22,
					"Should be 22 (busted constant value) but was "
							+ aValue.toString());
			test.done();
		}, 10);
	},
	'calculateHandValue with 11 aces' : function(test) {
		setTimeout(function() {
			var aCard = blackjack.shoe.dealAce();
			var aHand = [ aCard, aCard, aCard, aCard, aCard, aCard, aCard,
					aCard, aCard, aCard, aCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 21, "Should be 21 but was "
					+ aValue.toString());
			test.done();
		}, 10);
	},
	'calculateHandValue with ace first order' : function(test) {
		setTimeout(function() {
			var aCard = blackjack.shoe.dealAce();
			var anotherCard = blackjack.shoe.dealSix();
			var aThirdCard = blackjack.shoe.dealFive();
			var aHand = [ aCard, anotherCard, aThirdCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 12, "Should be 12 but was "
					+ aValue.toString());
			test.done();
		}, 10);
	},
	'calculateHandValue with ace last order' : function(test) {
		setTimeout(function() {
			var aCard = blackjack.shoe.dealFive();
			var anotherCard = blackjack.shoe.dealSix();
			var aThirdCard = blackjack.shoe.dealAce();
			var aHand = [ aCard, anotherCard, aThirdCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 12, "Should be 12 but was "
					+ aValue.toString());
			test.done();
		}, 10);
	}
});
