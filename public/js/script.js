var HELIT_APP = {
	answers: []
};
var socket = io();

$(document).ready(function(){
	$('#patientForm').submit(function(e) {
		e.preventDefault();
		HELIT_APP.user_id = $('#idInput').val();
		socket.emit('start', {
			first_name: $('#firstNameInput').val(),
			last_name: $('#lastNameInput').val(),
			id: $('#idInput').val(),
			test_type: $('#testTypeInput').val()
		});
	});

	$('#questionForm').submit(function(e) {
		e.preventDefault();

		//get answer
		var question_number = HELIT_APP.current_question_number;
		var answer = [];
    var temp = $('.choice:checked');
    var priorityScore = 0;
    var choices = HELIT_APP.test.questions[HELIT_APP.current_question_number].choices;

    for(var i = 0; i < temp.length; i++) {
      answer.push(temp[i].value);
    }

		if(answer.length === 0) {
			return;
		}

    console.log(answer);

    for(var i = 0; i < choices.length; i++) {
      if(choices[i].correct) {
        //check if user answerd this correctly
        if(!answer.indexOf(choices[i].text)) {
          priorityScore += choices[i].value;
        }
      }
    }

		HELIT_APP.answers.push({
			question_number: question_number,
      priorityScore: priorityScore,
			answer: answer
		});
	
		//load next question
		if(HELIT_APP.current_question_number === HELIT_APP.test.questions.length) {
			//send answers to server
			console.log('sending test');
			socket.emit('test_submit', {
				id: HELIT_APP.user_id,
				answers: HELIT_APP.answers
			});

			loadEndPage();			
		} else {
			loadQuestion(HELIT_APP.test.questions[HELIT_APP.current_question_number]);
			HELIT_APP.current_question_number++;
		}
	});

	socket.on('test_start', function(data) {
		if(data.status === 'error') {
			console.log("ERROR: " + data.msg);
			return;
		}

		HELIT_APP.test = data.test;
		//hide test form
		$('#patientForm').css('display', 'none');

		//sort questions
		HELIT_APP.test.questions.sort(function(a,b) {
			if(a.number < b.number)
				return -1;
			else if(a.number > b.number)
				return 1;
			else
				return 0;
		});

		//load question 1
		loadQuestion(HELIT_APP.test.questions[0]);
		HELIT_APP.current_question_number = 1;

		//show question form
		$('#questionForm').css('display', 'block');
		console.log(data);
	});
});

function loadEndPage() {
	//hide question form
	$('#questionForm').css('display', 'none');

	//show end page	
	$('#endPage').css('display', 'block');
}

function loadQuestion(question) {
	var choices = [];
	for(var i = 0; i < question.choices.length; i++) {
		var newchoice;
		if(question.max_answers === 1) {
			newchoice = $('#radioModel').clone();
		} else {
			newchoice = $('#checkboxModel').clone();
		}
		
		//drop id
		$(newchoice).removeAttr('id');

		//change display
		$(newchoice).css('display', 'block');

		//change data
		$($(newchoice).find('input')[0]).attr('value', question.choices[i].text);
		$($(newchoice).find('p')).text(question.choices[i].text);

		choices.push(newchoice);
	}

	$('#questionBody').text(question.body);

	//remove existing choices
	var existing_choices = $('#questionForm .choice-container');
	for(var i = 0; i < existing_choices.length; i++) {
		$(existing_choices[i]).remove();
	}	

	//add to DOM
	for(var i = choices.length-1; i >= 0; i--) {
		$('#questionBody').after($(choices[i]));
	}
}
