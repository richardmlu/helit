$(document).ready(function(){
	$('#patientForm').submit(function(e) {
		e.preventDefault();

		$.post('/RegisterPatient', {
			first_name: $('#firstNameInput').val(),
			last_name: $('#lastNameInput').val(),
			id: $('#idInput').val()
		}, function(data){
			if(data.msg === "success") {
				$('#submit-button').attr('value', 'Success');
				$('#submit-button').css('background-color', '#00e800');
			} else {
				$('#submit-button').attr('value', 'Failed');
				$('#submit-button').css('background-color', '#f90022');
			}
		});
	});
});
