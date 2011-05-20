this.gameEngineTestSuite = {
	'calculateHandValue with null argument' : function(test) {
		setTimeout(function() {
			test.strictEqual(calculateHandValue(), 0, "Should be 0");
			test.done();
		}, 10);
	},
	'calculateHandValue with empty collection' : function(test) {
		setTimeout(function() {
			test.strictEqual(calculateHandValue([]), 0, "Should be 0");
			test.done();
		}, 10);
	},
	'calculateHandValue with a single ace' : function(test) {
		setTimeout(function() {
			var aCard = {
				type : 'A'
			};
			var aHand = [ aCard ];
			test.strictEqual(calculateHandValue(aHand), 11, "Should be 11");
			test.done();
		}, 10);
	},
	'calculateHandValue with a single 2' : function(test) {
		setTimeout(function() {
			var aCard = {
				type : '2'
			};
			var aHand = [ aCard ];
			test.strictEqual(calculateHandValue(aHand), 2, "Should be 2");
			test.done();
		}, 10);
	},
	'calculateHandValue with a single 3' : function(test) {
		setTimeout(function() {
			var aCard = {
				type : '3'
			};
			var aHand = [ aCard ];
			test.strictEqual(calculateHandValue(aHand), 3, "Should be 3");
			test.done();
		}, 10);
	},
	'calculateHandValue with a single 4' : function(test) {
		setTimeout(function() {
			var aCard = {
				type : '4'
			};
			var aHand = [ aCard ];
			test.strictEqual(calculateHandValue(aHand), 4, "Should be 4");
			test.done();
		}, 10);
	},
	'calculateHandValue with a single 5' : function(test) {
		setTimeout(function() {
			var aCard = {
				type : '5'
			};
			var aHand = [ aCard ];
			test.strictEqual(calculateHandValue(aHand), 5, "Should be 5");
			test.done();
		}, 10);
	},
	'calculateHandValue with a single 6' : function(test) {
		setTimeout(function() {
			var aCard = {
				type : '6'
			};
			var aHand = [ aCard ];
			test.strictEqual(calculateHandValue(aHand), 6, "Should be 6");
			test.done();
		}, 10);
	},
	'calculateHandValue with a single 7' : function(test) {
		setTimeout(function() {
			var aCard = {
				type : '7'
			};
			var aHand = [ aCard ];
			test.strictEqual(calculateHandValue(aHand), 7, "Should be 7");
			test.done();
		}, 10);
	},
	'calculateHandValue with a single 8' : function(test) {
		setTimeout(function() {
			var aCard = {
				type : '8'
			};
			var aHand = [ aCard ];
			test.strictEqual(calculateHandValue(aHand), 8, "Should be 8");
			test.done();
		}, 10);
	},
	'calculateHandValue with a single 9' : function(test) {
		setTimeout(function() {
			var aCard = {
				type : '9'
			};
			var aHand = [ aCard ];
			test.strictEqual(calculateHandValue(aHand), 9, "Should be 9");
			test.done();
		}, 10);
	},
	'calculateHandValue with a single 10' : function(test) {
		setTimeout(function() {
			var aCard = {
				type : '10'
			};
			var aHand = [ aCard ];
			test.strictEqual(calculateHandValue(aHand), 10, "Should be 10");
			test.done();
		}, 10);
	},
	'calculateHandValue with a single jack' : function(test) {
		setTimeout(function() {
			var aCard = {
				type : 'J'
			};
			var aHand = [ aCard ];
			test.strictEqual(calculateHandValue(aHand), 10, "Should be 10");
			test.done();
		}, 10);
	},
	'calculateHandValue with a single queen' : function(test) {
		setTimeout(function() {
			var aCard = {
				type : 'Q'
			};
			var aHand = [ aCard ];
			test.strictEqual(calculateHandValue(aHand), 10, "Should be 10");
			test.done();
		}, 10);
	},
	'calculateHandValue with a single king' : function(test) {
		setTimeout(function() {
			var aCard = {
				type : 'K'
			};
			var aHand = [ aCard ];
			test.strictEqual(calculateHandValue(aHand), 10, "Should be 10");
			test.done();
		}, 10);
	}

};