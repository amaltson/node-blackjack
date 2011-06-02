var Blackjack = require('../scripts/game.js');
var testCase = require('nodeunit').testCase;

module.exports = testCase({
	setUp : function(callback) {
		blackjack = new Blackjack();
		callback();
	},

	'size of deck' : function(test) {
		setTimeout(function() {
			test.strictEqual(blackjack.shoe.deck.length, 13, "Should be 13");
			test.done();
		}, 10);
	},

	'dealt an Ace' : function(test) {
		setTimeout(function() {
			var card = blackjack.shoe.dealAce();
			var result = card.type;
			var expectedType = 'A';
			test.strictEqual(result, expectedType, "Should be " + expectedType
					+ " but was " + result);
			test.done();
		}, 10);
	},

	'dealt a 2' : function(test) {
		setTimeout(function() {
			var card = blackjack.shoe.dealTwo();
			var result = card.type;
			var expectedType = '2';
			test.strictEqual(result, expectedType, "Should be " + expectedType
					+ " but was " + result);
			test.done();
		}, 10);
	},

	'dealt a 3' : function(test) {
		setTimeout(function() {
			var card = blackjack.shoe.dealThree();
			var result = card.type;
			var expectedType = '3';
			test.strictEqual(result, expectedType, "Should be " + expectedType
					+ " but was " + result);
			test.done();
		}, 10);
	},

	'dealt a 4' : function(test) {
		setTimeout(function() {
			var card = blackjack.shoe.dealFour();
			var result = card.type;
			var expectedType = '4';
			test.strictEqual(result, expectedType, "Should be " + expectedType
					+ " but was " + result);
			test.done();
		}, 10);
	},

	'dealt a 5' : function(test) {
		setTimeout(function() {
			var card = blackjack.shoe.dealFive();
			var result = card.type;
			var expectedType = '5';
			test.strictEqual(result, expectedType, "Should be " + expectedType
					+ " but was " + result);
			test.done();
		}, 10);
	},

	'dealt a 6' : function(test) {
		setTimeout(function() {
			var card = blackjack.shoe.dealSix();
			var result = card.type;
			var expectedType = '6';
			test.strictEqual(result, expectedType, "Should be " + expectedType
					+ " but was " + result);
			test.done();
		}, 10);
	},

	'dealt a 7' : function(test) {
		setTimeout(function() {
			var card = blackjack.shoe.dealSeven();
			var result = card.type;
			var expectedType = '7';
			test.strictEqual(result, expectedType, "Should be " + expectedType
					+ " but was " + result);
			test.done();
		}, 10);
	},

	'dealt an 8' : function(test) {
		setTimeout(function() {
			var card = blackjack.shoe.dealEight();
			var result = card.type;
			var expectedType = '8';
			test.strictEqual(result, expectedType, "Should be " + expectedType
					+ " but was " + result);
			test.done();
		}, 10);
	},

	'dealt a 9' : function(test) {
		setTimeout(function() {
			var card = blackjack.shoe.dealNine();
			var result = card.type;
			var expectedType = '9';
			test.strictEqual(result, expectedType, "Should be " + expectedType
					+ " but was " + result);
			test.done();
		}, 10);
	},

	'dealt a 10' : function(test) {
		setTimeout(function() {
			var card = blackjack.shoe.dealTen();
			var result = card.type;
			var expectedType = '10';
			test.strictEqual(result, expectedType, "Should be " + expectedType
					+ " but was " + result);
			test.done();
		}, 10);
	},

	'dealt a Jack' : function(test) {
		setTimeout(function() {
			var card = blackjack.shoe.dealJack();
			var result = card.type;
			var expectedType = 'J';
			test.strictEqual(result, expectedType, "Should be " + expectedType
					+ " but was " + result);
			test.done();
		}, 10);
	},

	'dealt a Queen' : function(test) {
		setTimeout(function() {
			var card = blackjack.shoe.dealQueen();
			var result = card.type;
			var expectedType = 'Q';
			test.strictEqual(result, expectedType, "Should be " + expectedType
					+ " but was " + result);
			test.done();
		}, 10);
	},

	'dealt a King' : function(test) {
		setTimeout(function() {
			var card = blackjack.shoe.dealKing();
			var result = card.type;
			var expectedType = 'K';
			test.strictEqual(result, expectedType, "Should be " + expectedType
					+ " but was " + result);
			test.done();
		}, 10);
	},

	'randomly dealt an Ace' : function(test) {
		setTimeout(function() {
			var card = blackjack.shoe.dealNextCard(0);
			var result = card.type;
			var expectedType = 'A';
			test.strictEqual(result, expectedType, "Should be " + expectedType
					+ " but was " + result);
			test.done();
		}, 10);
	},

	'randomly dealt a King' : function(test) {
		setTimeout(function() {
			var card = blackjack.shoe.dealNextCard(12);
			var result = card.type;
			var expectedType = 'K';
			test.strictEqual(result, expectedType, "Should be " + expectedType
					+ " but was " + result);
			test.done();
		}, 10);
	},

	'randomly get a card index' : function(test) {
		setTimeout(function() {
			var index = blackjack.shoe.randomCardIndex();
			test.ok(index > -1 && index < 13,
					"Should be between 0 and 12 but was " + index);
			test.done();
		}, 10);
	},

	'randomly dealt a card' : function(test) {
		setTimeout(function() {
			var card = blackjack.shoe.dealNextCard();
			var result = card.type;
			var cardIdentified = false;
			for ( var i = 0; i < blackjack.shoe.deck.length; i++) {
				if (blackjack.shoe.deck[i].type === result) {
					cardIdentified = true;
					break;
				}
			}
			test.ok(cardIdentified, "Card " + result
					+ " was not found in the deck");
			test.done();
		}, 10);
	}
});
