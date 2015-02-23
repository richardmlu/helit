var mongoose = require('mongoose');

var TestSchema = mongoose.Schema({
	name: String,
	questions: Array
});

var QuestionSchema = mongoose.Schema({
	body: String,
	choices: Array,
	correct_answer: String,
	max_answers: Number	
});

var TestModel = mongoose.model('Test', TestSchema);
var QuestionModel = mongoose.model('Question', QuestionSchema);

module.exports.TestModel = TestModel;
module.exports.QuestionModel = QuestionModel;
