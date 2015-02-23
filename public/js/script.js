var socket = io();

$(document).ready(function(){
	$('#patientForm').submit(function(e) {
		e.preventDefault();
		socket.emit('start', {msg: 'test'});
		console.log('hello');
	});	
});
