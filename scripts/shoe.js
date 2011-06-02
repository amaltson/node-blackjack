/**
 * This simulates the shoe (the deck of cards). We are not keeping track of
 * "burnt" cards
 */
module.exports = function Shoe() {

	this.dealNextCard = function() {
		var deckIndex = this.randomCardIndex();
		if (deckIndex < 0 || deckIndex > this.deck.length) {
			throw Error(deckIndex + " couldn't be made into a card.");
		}
		return this.deck[deckIndex];
	};

	this.deck = [ {
		type : 'A'
	}, {
		type : '2'
	}, {
		type : '3'
	}, {
		type : '4'
	}, {
		type : '5'
	}, {
		type : '6'
	}, {
		type : '7'
	}, {
		type : '8'
	}, {
		type : '9'
	}, {
		type : '10'
	}, {
		type : 'J'
	}, {
		type : 'Q'
	}, {
		type : 'K'
	} ];

	this.dealAce = function() {
		return this.deck[0];
	};

	this.dealKing = function() {
		return this.deck[12];
	};

	this.dealQueen = function() {
		return this.deck[11];
	};

	this.dealJack = function() {
		return this.deck[10];
	};

	this.dealTen = function() {
		return this.deck[9];
	};

	this.dealNine = function() {
		return this.deck[8];
	};

	this.dealEight = function() {
		return this.deck[7];
	};

	this.dealSeven = function() {
		return this.deck[6];
	};

	this.dealSix = function() {
		return this.deck[5];
	};

	this.dealFive = function() {
		return this.deck[4];
	};

	this.dealFour = function() {
		return this.deck[3];
	};

	this.dealThree = function() {
		return this.deck[2];
	};

	this.dealTwo = function() {
		return this.deck[1];
	};

	// randomly pick a number between 0 and 12
	this.randomCardIndex = function() {
		return Math.floor(Math.random() * 13);
	};
};