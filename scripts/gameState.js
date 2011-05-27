var Blackjack = module.exports = function Blackjack() {

  this.players = {};
}

Blackjack.prototype = {
  
  addPlayer: function() {
    // assume getting a vararg
    for (var i = 0; i < arguments.length; i++) {
      this.players[arguments[i].userId] = arguments[i];
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
  }
}
