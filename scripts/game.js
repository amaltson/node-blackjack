var Blackjack = module.exports = function Blackjack() {

  // constants
  this.BLACKJACK = 21;
  this.BUSTED_VALUE = 22;

  this.players = {};
  this.table = [];
  this.current = 0;
  return this;
}

Blackjack.prototype = {
  
  /**
   * Adds players to the current game. No arguments on the function because
   * this works with varargs.
   *
   * @param players 0 to arguments.length -1  are players.
   * @param callback argument.length is the callback function.
   */
  addPlayers: function() {
    // assume getting a vararg
    for (var i = 0; i < arguments.length - 1; i++) {
      this.players[arguments[i].userId] = arguments[i];
      this.table.push(arguments[i].userId);
    }
    arguments[arguments.length -1]();
  },

  getPlayer: function(userId, callback) {
    callback(this.players[userId]);
  },

  getAllPlayers: function(callback) {
    var result = [];
    for (userId in this.players) {
      result.push(this.players[userId]);
    }
    callback(result);
  },

  removePlayer: function(userId, callback) {
    delete this.players[userId];
    for (var i = 0; i < this.table.length; i++) {
      if (this.table[i] === userId) {
        this.table.splice(i, 1);
        break;
      }
    }
    callback();
  },

  nextTurn: function(callback) {
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

  currentTurn: function(callback) {
    var cur = this.current;
    if (this.current > this.table.length - 1) {
      cur = this.table.length - 1;
    }
    callback(this.table[cur]);
  },

  setTurn: function(userId, callback) {
    for (var i = 0; i < this.table.length; i++) {
      if (this.table[i] === userId) {
        this.current = i;
        break;
      }
    }
    callback();
  },

  /**
   * this simulates the dealer shoe
   * we are not keeping track of "burnt" cards
   */
  dealNextCard: function() {
    // randomly pick a number between 1 and 13
    var randomNumber = Math.floor(Math.random() * 13 + 1);
    if (randomNumber >= 2 && randomNumber <= 10) {
      return {
        type: randomNumber + ""
      };
    }
    switch (randomNumber) {
    case 1:
      return {
        type : "A"
      };
      break;
    case 11:
      return {
        type : "J"
      };
      break;
    case 12:
      return {
        type : "Q"
      };
      break;
    case 13:
      return {
        type : "K"
      };
      break;
    default:
      // should never get here
      throw Error(randomNumber + " couldn't be made into a card.");
      break;
    }
  },

  // parameter dealerTotal and playerTotal are integers
  determinePlayerWin: function(dealerTotal, playerTotal) {
    if (playerTotal > this.BLACKJACK) {
      return 'bust';
    } else if (playerTotal > dealerTotal) {
      return 'win';
    } else if (playerTotal == dealerTotal) {
      return 'tie';
    } else {
      return 'lose';
    }
  },

  // test if something is undefined
  isUndefined: function(anObject) {
    // undefined and null are "==" but not identity equal ("===")
    return anObject == null && anObject !== null; 
  },

  // the hand value calculator
  calculateHandValue: function(aHand) {
    var totalValue = 0;
    var numberOfAces = 0;
    
    // protect against empty argument list or empty collection
    if (this.isUndefined(aHand) || aHand.length === 0) {
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
          throw 'calculateHandValue cannot convert unrecognized card type';
        }
      }
      totalValue += cardValue;
    }
    
    // Now we handle the case of the Aces, they're trickier because they can be
    // 1 or 11.
    if (totalValue < this.BLACKJACK) {
      for (var j = 0; j < numberOfAces; j++) {
        cardValue = (totalValue > 10) ? 1 : 11;
        totalValue += cardValue;
      }		
    }	
    return (totalValue > this.BLACKJACK) ? this.BUSTED_VALUE : totalValue;
  }
}
