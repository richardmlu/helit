$(document).ready(function(){
	$('#patientForm').submit(function(e) {
		e.preventDefault();

		$.post('/PatientSearch', {
			id: $('#idInput').val()
		}, function(data){
			if(data.status === "success") {
				for(var i = 0; i < data.results[0].answers.length; i++) {
					var printstring = data.results[0].answers[i].question_number + ": " + data.results[0].answers[i].answer;
					$('#results-container').append($("<p>" + printstring + "</p>"));
					$('#results-container').append($('<br>'));
				}
			} else {
				$('#results-container').text("Patient search failed.");
			}
		});
	});
});
