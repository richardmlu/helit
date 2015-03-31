var mongoose = require('mongoose');

var TestSchema = mongoose.Schema({
	name: String,
	questions: Array
});

/*
 * ~~Question Schema~~
 * number - Question's number (order in which it is shown)
 * category - Type of question (ex. Personal, Info)
 * priority - Question's importance
 * body - question text
 * choices - array of choice objets with text, correctness, and value
 *  {
 *    text: "sample choice", //choice text
 *    correct: false, //true = correct, false = not correct (false when theres no correct answer)
 *    value: 20 //point value
 *  }
 *  max_answers - maximum number of choices allowed to be selected
 */
var QuestionSchema = mongoose.Schema({
	number: Number,
  category: String,
  priority: Number,
	body: String,
	choices: Array,
	max_answers: Number	
});

var TestModel = mongoose.model('Test', TestSchema);
var QuestionModel = mongoose.model('Question', QuestionSchema);

module.exports.TestModel = TestModel;
module.exports.QuestionModel = QuestionModel;
