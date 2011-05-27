var Blackjack = module.exports = function Blackjack() {

  this.players = {};
  this.table = [];
  this.current = 0;
}

Blackjack.prototype = {
  
  addPlayer: function() {
    // assume getting a vararg
    for (var i = 0; i < arguments.length; i++) {
      this.players[arguments[i].userId] = arguments[i];
      this.table.push(arguments[i].userId);
    }
  },

  getPlayer: function(userId) {
    return this.players[userId];
  },

  getAllPlayers: function() {
    var result = [];
    for (userId in this.players) {
      result.push(this.players[userId]);
    }
    return result;
  },

  nextTurn : function() {
    var result = this.table[this.current];
    if (this.current < this.table.length - 1) {
      this.current += 1;
    } else {
      this.current = 0;
    }

    return result;
  },
}
