var socket;

function setupClient() {
	socket = new io.Socket('localhost', {
		port : 9000
	});
	socket.connect();

	socket.on('connect', function() {
		$('#main').append('<b>Connected to server<b>');
	});

	socket.on('message', function(msg) {
		alert("message recieved " + msg);
		// $("#log").append('<li>Received: ' + msg + '</li>');
	});

	socket.on('close', function() {
		$("#main").append("<b>Connection closed<b>");
	});

	socket.on('disconnect', function() {
		$("#main").append("<b>Connection disconnected<b>");
	});
}

/*
 * function initDom() { $('#inputBtn').bind('click', function() { inputData =
 * $('#inputTxt').attr('value'); socket.send(inputData); $('#log').append('<li>Sending: ' +
 * inputData + '</li>'); }); }
 */

$(document).ready(function() {
	setupClient();
});