fibTestSuite = {
	'fib with 0' : function(test) {
		setTimeout(function() {
			test.expect(1); // Expecting to test only 1 assertion
			var actual = fib(0); // The tested Result
			var expected = 0; // The expected Result
			test.strictEqual(actual, expected,
					"Fib(0) should have been 0 but was " + actual);
			test.done(); // To stop the test and indicate that it's done
		}, 10); // How long to wait before quitting the test
	},

	'fib with 1' : function(test) {
		setTimeout(function() {
			test.expect(1); // Expecting to test only 1 assertion
			var actual = fib(1); // The tested Result
			var expected = 1; // The expected Result
			test.strictEqual(actual, expected,
					"Fib(1) should have been 1 but was " + actual);
			test.done(); // To stop the test and indicate that it's done
		}, 10); // How long to wait before quitting the test
	},

	'fib with 2' : function(test) {
		setTimeout(function() {
			test.expect(1); // Expecting to test only 1 assertion
			var actual = fib(2); // The tested Result
			var expected = 1; // The expected Result
			test.strictEqual(actual, expected,
					"Fib(2) should have been 1 but was " + actual);
			test.done(); // To stop the test and indicate that it's done
		}, 10); // How long to wait before quitting the test
	},

	'fib with 10' : function(test) {
		setTimeout(function() {
			test.expect(1);
			var actual = fib(10); // The tested Result
			var expected = 55; // The expected Result
			test.strictEqual(actual, expected,
					"Fib(10) should have been 55 but was " + actual);
			test.done(); // To stop the test and indicate that it's done
		}, 10);
	}
};
