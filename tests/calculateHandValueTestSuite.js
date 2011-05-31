var Blackjack = require('../scripts/game.js');
var blackjack = new Blackjack();

this.calculateHandValueTestSuite = {
	'calculateHandValue with null argument' : function(test) {
		setTimeout(function() {
			test.strictEqual(blackjack.calculateHandValue(), 0, "Should be 0");
			test.done();
		}, 10);
	},
	'calculateHandValue with empty collection' : function(test) {
		setTimeout(function() {
			test.strictEqual(blackjack.calculateHandValue([]), 0, "Should be 0");
			test.done();
		}, 10);
	},
	'calculateHandValue with a single ace' : function(test) {
		setTimeout(function() {
			var aCard = {
				type : 'A'
			};
			var aHand = [ aCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 11, "Should be 11 but was "
					+ aValue.toString());
			test.done();
		}, 10);
	},
	'calculateHandValue with a single 2' : function(test) {
		setTimeout(function() {
			var aCard = {
				type : '2'
			};
			var aHand = [ aCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 2, "Should be 2 but was "
					+ aValue.toString());
			test.done();
		}, 10);
	},
	'calculateHandValue with a single 3' : function(test) {
		setTimeout(function() {
			var aCard = {
				type : '3'
			};
			var aHand = [ aCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 3, "Should be 3 but was "
					+ aValue.toString());
			test.done();
		}, 10);
	},
	'calculateHandValue with a single 4' : function(test) {
		setTimeout(function() {
			var aCard = {
				type : '4'
			};
			var aHand = [ aCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 4, "Should be 4 but was "
					+ aValue.toString());
			test.done();
		}, 10);
	},
	'calculateHandValue with a single 5' : function(test) {
		setTimeout(function() {
			var aCard = {
				type : '5'
			};
			var aHand = [ aCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 5, "Should be 5 but was "
					+ aValue.toString());
			test.done();
		}, 10);
	},
	'calculateHandValue with a single 6' : function(test) {
		setTimeout(function() {
			var aCard = {
				type : '6'
			};
			var aHand = [ aCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 6, "Should be 6 but was "
					+ aValue.toString());
			test.done();
		}, 10);
	},
	'calculateHandValue with a single 7' : function(test) {
		setTimeout(function() {
			var aCard = {
				type : '7'
			};
			var aHand = [ aCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 7, "Should be 7 but was "
					+ aValue.toString());
			test.done();
		}, 10);
	},
	'calculateHandValue with a single 8' : function(test) {
		setTimeout(function() {
			var aCard = {
				type : '8'
			};
			var aHand = [ aCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 8, "Should be 8 but was "
					+ aValue.toString());
			test.done();
		}, 10);
	},
	'calculateHandValue with a single 9' : function(test) {
		setTimeout(function() {
			var aCard = {
				type : '9'
			};
			var aHand = [ aCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 9, "Should be 9 but was "
					+ aValue.toString());
			test.done();
		}, 10);
	},
	'calculateHandValue with a single 10' : function(test) {
		setTimeout(function() {
			var aCard = {
				type : '10'
			};
			var aHand = [ aCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 10, "Should be 10 but was "
					+ aValue.toString());
			test.done();
		}, 10);
	},
	'calculateHandValue with a single jack' : function(test) {
		setTimeout(function() {
			var aCard = {
				type : 'J'
			};
			var aHand = [ aCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 10, "Should be 10 but was "
					+ aValue.toString());
			test.done();
		}, 10);
	},
	'calculateHandValue with a single queen' : function(test) {
		setTimeout(function() {
			var aCard = {
				type : 'Q'
			};
			var aHand = [ aCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 10, "Should be 10 but was "
					+ aValue.toString());
			test.done();
		}, 10);
	},
	'calculateHandValue with a single king' : function(test) {
		setTimeout(function() {
			var aCard = {
				type : 'K'
			};
			var aHand = [ aCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 10, "Should be 10 but was "
					+ aValue.toString());
			test.done();
		}, 10);
	},
	'calculateHandValue with two aces' : function(test) {
		setTimeout(function() {
			var aCard = {
				type : 'A'
			};
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
			var aCard = {
				type : 'A'
			};
			var anotherCard = {
				type : '2'
			};
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
			var aCard = {
				type : 'A'
			};
			var anotherCard = {
				type : '9'
			};
			var aHand = [ aCard, anotherCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 20, "Should be 20 but was "
					+ aValue.toString());
			test.done();
		}, 10);
	},
	'calculateHandValue with an ace and a 10' : function(test) {
		setTimeout(function() {
			var aCard = {
				type : 'A'
			};
			var anotherCard = {
				type : '10'
			};
			var aHand = [ aCard, anotherCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 21, "Should be 21 but was "
					+ aValue.toString());
			test.done();
		}, 10);
	},
	'calculateHandValue with an ace and a face card (J,Q,K)' : function(test) {
		setTimeout(function() {
			var aCard = {
				type : 'A'
			};
			var anotherCard = {
				type : 'Q'
			};
			var aHand = [ aCard, anotherCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 21, "Should be 21 but was "
					+ aValue.toString());
			test.done();
		}, 10);
	},
	'calculateHandValue with 3 aces' : function(test) {
		setTimeout(function() {
			var aCard = {
				type : 'A'
			};
			var aHand = [ aCard, aCard, aCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 13, "Should be 13 but was "
					+ aValue.toString());
			test.done();
		}, 10);
	},
	'calculateHandValue with value over 21' : function(test) {
		setTimeout(function() {
			var aCard = {
				type : '10'
			};
			var anotherCard = {
				type : 'K'
			};
			var aThirdCard = {
				type : '2'
			};
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
			var aCard = {
				type : 'J'
			};
			var anotherCard = {
				type : 'Q'
			};
			var aThirdCard = {
				type : 'K'
			};
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
			var aCard = {
				type : 'A'
			};
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
			var aCard = {
				type : 'A'
			};
			var anotherCard = {
				type : '6'
			};
			var aThirdCard = {
				type : '5'
			};
			var aHand = [ aCard, anotherCard, aThirdCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 12, "Should be 12 but was "
					+ aValue.toString());
			test.done();
		}, 10);
	},
	'calculateHandValue with ace last order' : function(test) {
		setTimeout(function() {
			var aCard = {
				type : '5'
			};
			var anotherCard = {
				type : '6'
			};
			var aThirdCard = {
				type : 'A'
			};
			var aHand = [ aCard, anotherCard, aThirdCard ];
			var aValue = blackjack.calculateHandValue(aHand);
			test.strictEqual(aValue, 12, "Should be 12 but was "
					+ aValue.toString());
			test.done();
		}, 10);
	}
};
