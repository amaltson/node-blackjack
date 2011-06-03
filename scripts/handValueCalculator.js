// This defines the hand value calculator, it takes a player's hand and returns
// a numeric value representing the optimal value of the hand
module.exports = function HandValueCalculator() {
	// constants
	this.BLACKJACK = 21;
	this.BUSTED_VALUE = 22;

	// test if something is undefined
	this.isUndefined = function(anObject) {
		// undefined and null are "==" but not identity equal ("===")
		return anObject == null && anObject !== null;
	};

	// the hand value calculator
	this.calculateHandValue = function(aHand) {
	};
};