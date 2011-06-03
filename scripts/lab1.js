//
// Lab 1: Using TDD to develop code in JavaScript.
// 
// A well-known function in computer science is the Fibonacci Sequence.
// By definition, the Sequence numbers are:
// Fibonacci(0) = 0;
// Fibonacci(1) = 1;
// Fibonacci(n) = Fibonacci(n-1) + Fibonacci(n-2) for positive integers n >= 2.
// 
// Task: Write a function that will calculate the Fibonacci number for an
// arbitrary integer n using TDD. The method is already stubbed for you below.
// See lab1TestSuite.js in the tests diretory for stubbing of your test code.
// Run it by pointing a browser at lab1TestSuite.html in the tests directory.
// 

// Function to calculate the Fibonacci number for a given integer n.
function fib(n) {

	if (n === 0) {
		return 0;
	} else if (n === 1) {
		return 1;
	}
	return (fib(n - 1) + fib(n - 2));
};
