/**
 * This simulates the shoe (the deck of cards). We are not keeping track of
 * "burnt" cards
 */
function Shoe() {

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

	this.dealNextCard = function(cardIndex) {
		var deckIndex = (cardIndex == null) ? this.randomCardIndex()
				: cardIndex;
		if (deckIndex < 0 || deckIndex > this.deck.length) {
			throw Error(deckIndex + " couldn't be made into a card.");
		}
		return this.deck[deckIndex];
	};
}

// This defines the hand value calculator, it takes a player's hand and returns
// a numeric value representing the optimal value of the hand
function HandValueCalculator() {
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
}

module.exports = function Blackjack() {

	this.shoe = new Shoe();
	this.calculator = new HandValueCalculator();
	this.players = {};
	this.table = [];
	this.current = 0;

	this.dealNextCard = function() {
		return this.shoe.dealNextCard();
	};

	this.calculateHandValue = function(aHand) {
		return this.calculator.calculateHandValue(aHand);
	};

	/**
	 * Adds players to the current game. No arguments on the function because
	 * this works with varargs.
	 * 
	 * @param players
	 *            0 to arguments.length -1 are players.
	 * @param callback
	 *            argument.length is the callback function.
	 */
	this.addPlayers = function() {
		// assume getting a vararg
		for ( var i = 0; i < arguments.length - 1; i++) {
			this.players[arguments[i].userId] = arguments[i];
			this.table.push(arguments[i].userId);
		}
		arguments[arguments.length - 1]();
	};

	this.getPlayer = function(userId, callback) {
		callback(this.players[userId]);
	};

	this.getAllPlayers = function(callback) {
		var result = [];
		for (userId in this.players) {
			result.push(this.players[userId]);
		}
		callback(result);
	};

	this.removePlayer = function(userId, callback) {
		delete this.players[userId];
		for ( var i = 0; i < this.table.length; i++) {
			if (this.table[i] === userId) {
				this.table.splice(i, 1);
				break;
			}
		}
		callback();
	};

	this.nextTurn = function(callback) {
		var last = this.table.length - 1;
		if (this.current >= last) {
			this.current = last;
		}
		if (this.current < last) {
			this.current += 1;
		} else {
			this.current = 0;
		}
		var result = this.table[this.current];

		callback(result);
	},

	this.currentTurn = function(callback) {
		var cur = this.current;
		if (this.current > this.table.length - 1) {
			cur = this.table.length - 1;
		}
		callback(this.table[cur]);
	};

	this.setTurn = function(userId, callback) {
		for ( var i = 0; i < this.table.length; i++) {
			if (this.table[i] === userId) {
				this.current = i;
				break;
			}
		}
		callback();
	};

	// parameter dealerTotal and playerTotal are integers
	this.determinePlayerWin = function(dealerTotal, playerTotal) {
		if (playerTotal > blackjack) {
			return 'BUST';
		} else if (playerTotal > dealerTotal) {
			return 'WIN';
		} else if (playerTotal == dealerTotal) {
			return 'TIE';
		} else {
			return 'LOSE';
		}
	};

	return this;
};