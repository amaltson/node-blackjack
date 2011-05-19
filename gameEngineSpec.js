describe(
		"Game Engine",
		function() {
			it(
					"Hand Value calculator returns 0 when it receives a null input",
					function() {
						expect(HandValueCalculator.calculateValue()).toEqual(0);
					});

			it(
					"Hand Value calculator returns 0 when it receives an empty collection",
					function() {
						expect(HandValueCalculator.calculateValue([])).toEqual(
								0);
					});

			it(
					"Hand Value calculator returns 11 when it receives a single Ace",
					function() {
						var anAce = {
							type : 'A'
						};
						expect(HandValueCalculator.calculateValue([ anAce ]))
								.toEqual(11);
					});

			it("Hand Value calculator returns 2 when it receives a 2",
					function() {
						var anAce = {
							type : 'A'
						};
						expect(HandValueCalculator.calculateValue([ anAce ]))
								.toEqual(11);
					});

			it("Hand Value calculator returns 3 when it receives a 3",
					function() {
						var anAce = {
							type : 'A'
						};
						expect(HandValueCalculator.calculateValue([ anAce ]))
								.toEqual(11);
					});

			it("Hand Value calculator returns 4 when it receives a 4",
					function() {
						var anAce = {
							type : 'A'
						};
						expect(HandValueCalculator.calculateValue([ anAce ]))
								.toEqual(11);
					});

			it("Hand Value calculator returns 5 when it receives a 5",
					function() {
						var anAce = {
							type : 'A'
						};
						expect(HandValueCalculator.calculateValue([ anAce ]))
								.toEqual(11);
					});

			it("Hand Value calculator returns 6 when it receives a 6",
					function() {
						var anAce = {
							type : 'A'
						};
						expect(HandValueCalculator.calculateValue([ anAce ]))
								.toEqual(11);
					});

			it("Hand Value calculator returns 7 when it receives a 7",
					function() {
						var anAce = {
							type : 'A'
						};
						expect(HandValueCalculator.calculateValue([ anAce ]))
								.toEqual(11);
					});

			it("Hand Value calculator returns 8 when it receives a 8",
					function() {
						var anAce = {
							type : 'A'
						};
						expect(HandValueCalculator.calculateValue([ anAce ]))
								.toEqual(11);
					});

			it("Hand Value calculator returns 9 when it receives a 9",
					function() {
						var anAce = {
							type : 'A'
						};
						expect(HandValueCalculator.calculateValue([ anAce ]))
								.toEqual(11);
					});

			it("Hand Value calculator returns 10 when it receives a 10",
					function() {
						var anAce = {
							type : 'A'
						};
						expect(HandValueCalculator.calculateValue([ anAce ]))
								.toEqual(11);
					});

			it("Hand Value calculator returns 10 when it receives a Jack",
					function() {
						var anAce = {
							type : 'A'
						};
						expect(HandValueCalculator.calculateValue([ anAce ]))
								.toEqual(11);
					});

			it("Hand Value calculator returns 10 when it receives a Queen",
					function() {
						var anAce = {
							type : 'A'
						};
						expect(HandValueCalculator.calculateValue([ anAce ]))
								.toEqual(11);
					});

			it("Hand Value calculator returns 10 when it receives a King",
					function() {
						var anAce = {
							type : 'A'
						};
						expect(HandValueCalculator.calculateValue([ anAce ]))
								.toEqual(11);
					});

			it(
					"Hand Value calculator returns 12 when it receives 2+ cards that add to 11 with a single Ace, ace first",
					function() {
						var anAce = {
							type : 'A'
						};
						var aFive = {
							type : '5'
						};
						var aSix = {
							type : '6'
						};
						expect(
								HandValueCalculator.calculateValue([ anAce,
										aFive, aSix ])).toEqual(12);
					});

			it(
					"Hand Value calculator returns 12 when it receives 2+ cards that add to 11 with a single Ace, ace last",
					function() {
						var anAce = {
							type : 'A'
						};
						var aFive = {
							type : '5'
						};
						var aSix = {
							type : '6'
						};
						expect(
								HandValueCalculator.calculateValue([ aFive,
										aSix, anAce ])).toEqual(12);
					});

			it(
					"Hand Value calculator returns 12 when it receives 2+ cards that add to 11 with a single Ace, ace in the middle",
					function() {
						var anAce = {
							type : 'A'
						};
						var aFive = {
							type : '5'
						};
						var aSix = {
							type : '6'
						};
						expect(
								HandValueCalculator.calculateValue([ aFive,
										anAce, aSix ])).toEqual(12);
					});

			it("Hand Value calculator returns 12 when it receives 2 Aces",
					function() {
						var anAce = {
							type : 'A'
						};
						var anotherAce = {
							type : 'A'
						};
						expect(
								HandValueCalculator.calculateValue([ anAce,
										anotherAce ])).toEqual(12);
					});

		});