$(document).ready(function(){
	$('#patientForm').submit(function(e) {
		e.preventDefault();
      
		$.post('/PatientSearch', {
			id: $('#idInput').val()
    }, function(data){
      console.log(data);
      var graphData = {
        labels: [],
        datasets: [{
          label: "My Second dataset",
          fillColor: "rgba(151,187,205,0)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: []
        }]
      };

      graphData.datasets[0].data = data.graph.data;
      for(var i = 0; i < data.graph.labels.length; i++) {
        graphData.labels.push((new Date(data.graph.labels[i])).format('m/d/yy'));
      }
      
      //draw graph
      var ctx = document.getElementById("scoreGraph").getContext("2d");
      var myNewChart = new Chart(ctx).Line(graphData);

      //create concern items
      for(var i = 0; i < data.priorityConcerns.length; i++) {
        $('#infoContainer').append(createConcernItem(data.priorityConcerns[i]));
      }
		});
	});
});

function createConcernItem(concern) {
  //clone model
  var newConcern = $('#concern-item-model').clone();

  //remove id
  newConcern.removeAttr('id');

  //make displayable
  newConcern.css('display', 'block');

  //attach question
  $($(newConcern).find('.question-text')[0]).text(concern.question.body);

  //create answer string

  var answerString = "Answer given: ";

  answerString += concern.answer.answer.join(", ");
  $($(newConcern).find('.answer-text')[0]).text(answerString);

  return newConcern;
}
