/**
 * This simulates the shoe (the deck of cards). We are not keeping track of
 * "burnt" cards
 */
module.exports = function Shoe() {

  // Initialize the deck
  this.deck = [];

  // bind this to a variable to access it inside functions.
  var self = this;

  // convenience function that makes card objects.
  function makeCard(aStringCode) {
    return {
      type : aStringCode
    };
  }

  // add the cards to the deck.
  [ 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K' ]
      .forEach(function(aCode) {
        self.deck.push(makeCard(aCode));
      });

  // Function to get the next card, randomly from the deck.
  this.dealNextCard = function() {
    var deckIndex = this.randomCardIndex();
    if (deckIndex < 0 || deckIndex > this.deck.length) {
      throw Error(deckIndex + " couldn't be made into a card.");
    }
    return this.deck[deckIndex];
  };

  // randomly pick a number between 0 and the size of the deck.
  this.randomCardIndex = function() {
    return Math.floor(Math.random() * self.deck.length);
  };

  // The following dealXX() methods are only there for testing purposes.
  // Or cheating, of course.
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
};