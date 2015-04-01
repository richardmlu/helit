$(document).ready(function(){
	$('#patientForm').submit(function(e) {
		e.preventDefault();

		$.post('/PatientSearch', {
			id: $('#idInput').val()
    }, function(data){

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
      var ctx = document.getElementById("scoreGraph").getContext("2d");
      var myNewChart = new Chart(ctx).Line(graphData);

		});
	});
});
