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
		var totalValue = 0;
		var numberOfAces = 0;

		// protect against empty argument list or empty collection
		if (this.isUndefined(aHand) || aHand.length === 0) {
			return totalValue;
		}

		// Calculate the non-Ace hand value, and count up the Aces. They're
		// trickier
		// so we'll do them later.
		for ( var i = 0; i < aHand.length; i++) {
			var aCard = aHand[i];
			var cardValue = parseInt(aCard.type);
			if (isNaN(cardValue)) {
				switch (aCard.type) {
				case 'A':
					cardValue = 0;
					numberOfAces++;
					break;
				case 'J':
				case 'Q':
				case 'K':
					cardValue = 10;
					break;
				default:
					throw 'calculateHandValue cannot convert unrecognized card type';
				}
			}
			totalValue += cardValue;
		}

		// Now we handle the case of the Aces, they're trickier because they can
		// be 1 or 11.
		if (totalValue < this.BLACKJACK) {
			for ( var j = 0; j < numberOfAces; j++) {
				cardValue = (totalValue > 10) ? 1 : 11;
				totalValue += cardValue;
			}
		}
		return (totalValue > this.BLACKJACK) ? this.BUSTED_VALUE : totalValue;
	};
};