// global constants
var BLACKJACK = 21;
var BUSTED_VALUE = 22;
var IDLE = "Idle... Waiting for Players to join";
var WAITING = "Waiting For More Players";
var DEALING = "Dealing out initial cards";
var PLAYER_TURN = "Player's Turn";
var DEALER_TURN = "Dealer's Turn";
var DETERMINING_WINNERS = "Determining Winners";

// this simulates the dealer shoe
// we are not keeping track of "burnt" cards
function dealNextCard() {
	// randomly pick a number between 1 and 13
	var randomNumber = Math.floor(Math.random() * 13 + 1);
  if (randomNumber >= 2 && randomNumber <= 10) {
    return {
      type: randomNumber + ''
    };
  }
	switch (randomNumber) {
	case 1:
		return {
			type : 'A'
		};
		break;
	case 11:
		return {
			type : 'J'
		};
		break;
	case 12:
		return {
			type : 'Q'
		};
		break;
	case 13:
		return {
			type : 'K'
		};
		break;
	default:
		// should never get here
		throw Error(randomNumber + " couldn't be made into a card.");
		break;
	}

}

// parameter dealerTotal and playerTotal are integers
function determinePlayerWin(dealerTotal, playerTotal) {
	if (playerTotal > blackjack) {
		return 'BUST';
	} else if (playerTotal > dealerTotal) {
		return 'WIN';
	} else if (playerTotal == dealerTotal) {
		return 'TIE';
	} else {
		return 'LOSE';
	}

}

// test if something is undefined
function isUndefined(anObject) {
	// undefined and null are "==" but not identity equal ("===")
	return anObject == null && anObject !== null; 
}

// the hand value calculator
function calculateHandValue(aHand) {
	var totalValue = 0;
	var numberOfAces = 0;
	
	// protect against empty argument list or empty collection
	if (isUndefined(aHand) || aHand.length === 0) {
		return totalValue;
	}
		
	// Calculate the non-Ace hand value, and count up the Aces. They're trickier
	// so we'll do them later.
	for (var i = 0; i < aHand.length; i++) {
		var aCard = aHand[i];
		var cardValue = parseInt(aCard.type);
		if (isNaN(cardValue)) {	
			switch(aCard.type) {
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
				throw 'calculateHandValue cannot convert unrecognized card type';				}
		} 
		totalValue += cardValue;
	}
	
	// Now we handle the case of the Aces, they're trickier because they can be
	// 1 or 11.
	if (totalValue < BLACKJACK) {
		for (var j = 0; j < numberOfAces; j++) {
			cardValue = (totalValue > 10) ? 1 : 11;
			totalValue += cardValue;
		}		
	}	
	return (totalValue > BLACKJACK) ? BUSTED_VALUE : totalValue;
}
