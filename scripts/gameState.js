var Blackjack = module.exports = function Blackjack() {

  this.players = {};
  this.table = [];
  this.current = 0;
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

  nextTurn : function(callback) {
    var result = this.table[this.current];
    if (this.current < this.table.length - 1) {
      this.current += 1;
    } else {
      this.current = 0;
    }

    callback(result);
  },

  currentTurn : function(callback) {
    callback(this.table[this.current]);
  },
}
