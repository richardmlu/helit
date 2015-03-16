$(document).ready(function(){
	$('#patientForm').submit(function(e) {
		e.preventDefault();

		$.post('/PatientSearch', {
			id: $('#idInput').val()
		}, function(data){
			if(data.status === "success") {
				var printstring = "";
				for(var i = 0; i < data.results[0].answers.length; i++) {
					printstring += data.results[0].answers[i].question_number + ": " + data.results[0].answers[i].answer + "";
				}

				$('#results-container').text(printstring);
			} else {
				$('#results-container').text("Patient search failed.");
			}
		});
	});
});
