// global variable
var blackjack = 21;

// this simulates the dealer shoe
// we are not keeping track of "burnt" cards
function dealNextCard() {
	// randomly pick a number between 1 and 13
	var randomNumber = Math.floor(Math.random() * 13 + 1);
	switch (randomNumber) {
	case 1:
		return {
			type : 'A'
		};
		break;
	case 2:
		return {
			type : '2'
		};
		break;
	case 3:
		return {
			type : '3'
		};
		break;
	case 4:
		return {
			type : '4'
		};
		break;
	case 5:
		return {
			type : '5'
		};
		break;
	case 6:
		return {
			type : '6'
		};
		break;
	case 7:
		return {
			type : '7'
		};
		break;
	case 8:
		return {
			type : '8'
		};
		break;
	case 9:
		return {
			type : '9'
		};
		break;
	case 10:
		return {
			type : '10'
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
		return 'error';
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