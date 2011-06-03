fibTestSuite = {
	'Sample Test Code' : function(test) {
		setTimeout(function() {
			test.expect(1); // Expecting to test only 1 assertion
			var actual = 0; // The tested Result
			var expected = 0; // The expected Result
			test.strictEqual(actual, expected,
					"Some message indicating why it failed");
			test.done(); // To stop the test and indicate that it's done
		}, 10); // How long to wait before quitting the test
	},

	'Your Tests Start Here' : function(test) {
		setTimeout(function() {
			test.expect(1);
			test.ok(false, "This test should fail");
			test.done();
		}, 10);
	}
};
