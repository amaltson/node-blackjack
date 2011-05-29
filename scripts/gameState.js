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

  nextTurn : function(callback) {
    var last = this.table.length - 1;
    if (this.current >= last) {
      this.current = last;
    }
    var result = this.table[this.current];
    if (this.current < last) {
      this.current += 1;
    } else {
      this.current = 0;
    }

    callback(result);
  },

  currentTurn : function(callback) {
    var cur = this.current;
    if (this.current > this.table.length - 1) {
      cur = this.table.length - 1;
    }
    callback(this.table[cur]);
  },
}
