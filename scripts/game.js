var HandValueCalculator = require('./handValueCalculator.js');
var Shoe = require('./shoe.js');

module.exports = function Blackjack() {

  this.shoe = new Shoe();
  this.calculator = new HandValueCalculator();

  // constants
  this.BLACKJACK = this.calculator.BLACKJACK;
  this.BUSTED_VALUE = this.calculator.BUSTED_VALUE;

  this.players = {};
  this.table = [];
  this.current = 0;

  this.dealNextCard = function() {
    return this.shoe.dealNextCard();
  };

  this.calculateHandValue = function(aHand) {
    return this.calculator.calculateHandValue(aHand);
  };
  
  this.determinePlayerWin = function(dealerTotal, playerTotal) {
    return this.calculator.determinePlayerWin(dealerTotal, playerTotal);
  }

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

  this.resetPlayers = function(callback) {
    var that = this;
    this.getAllPlayers(function(players) {

      // reset all the player's hands
      for (var i = 0; i < players.length; i++) {
        var player = players[i];
        var firstCard = that.shoe.dealNextCard();
        if (player.userId === 'dealer') {
          player.hand = [firstCard, {type:'hidden'}];
        } else {
          var secondCard = that.shoe.dealNextCard();
          player.hand = [firstCard, secondCard];
        }
      }
      
      // callback with the reset players.
      callback(players);
    });
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
  };

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

  return this;
};
