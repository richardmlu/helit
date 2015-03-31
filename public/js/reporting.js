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

var data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
                {
                              label: "My First dataset",
                                          fillColor: "rgba(220,220,220,0.2)",
                                            strokeColor: "rgba(220,220,220,1)",
                                                        pointColor: "rgba(220,220,220,1)",
                                                          pointStrokeColor: "#fff",
                                                                      pointHighlightFill: "#fff",
                                                                        pointHighlightStroke: "rgba(220,220,220,1)",
                                                                                    data: [65, 59, 80, 81, 56, 55, 40]
                                                                                              },
                        {
                                      label: "My Second dataset",
                                                  fillColor: "rgba(151,187,205,0.2)",
                                                    strokeColor: "rgba(151,187,205,1)",
                                                                pointColor: "rgba(151,187,205,1)",
                                                                  pointStrokeColor: "#fff",
                                                                              pointHighlightFill: "#fff",
                                                                                pointHighlightStroke: "rgba(151,187,205,1)",
                                                                                            data: [28, 48, 40, 19, 86, 27, 90]
                                                                                                      }
          ]
};


  var ctx = document.getElementById("scoreGraph").getContext("2d");
  var myNewChart = new Chart(ctx).Line(data);
});
