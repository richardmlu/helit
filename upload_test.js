var TestModel = require('./TestSchema').TestModel,
    QuestionModel = require('./TestSchema').QuestionModel,
    mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/helit');

var db = mongoose.connection, 
    questions = [],
    temp_question = new QuestionModel,
    diabetes_test = new TestModel;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('connected');
});

temp_question = new QuestionModel;
temp_question.number = 1;
temp_question.body = "Do you have diabetes?";
temp_question.choices = [
  { 
    text: "No",
    correct: false,
    value: 0 
  }, 
  {
    text: "Yes; I have Type 1 Diabetes", 
    correct: false,
    value: 0
  },
  {
    text: "Yes; I have Type 2 Diabetes",
    correct: false,
    value: 0
  }
];
temp_question.max_answers = 1;
questions.push(temp_question);

temp_question = new QuestionModel;
temp_question.number = 2;
temp_question.body = "What does it mean to have diabetes?";
temp_question.choices = [
  { 
    text: "I can't digest sugar",
    correct: false,
    value: 0 
  }, 
  {
    text: "I have a lot of sugar in my blood", 
    correct: true,
    value: 3
  },
  {
    text: "I am allergic to sugar",
    correct: false,
    value: 0
  }
];
temp_question.max_answers = 1;
questions.push(temp_question);

temp_question = new QuestionModel;
temp_question.number = 3;
temp_question.body = "Can you cure diabetes?";
temp_question.choices = ["yes", "no"];
temp_question.correct_answer = ["no"];
temp_question.max_answers = 1;
questions.push(temp_question);

temp_question = new QuestionModel;
temp_question.number = 4;
temp_question.body = "How can you treat diabetes? Check all that apply.";
temp_question.choices = ["a", "b", "c", "d"];
temp_question.correct_answer = ["a", "b", "c"];
temp_question.max_answers = -1;
questions.push(temp_question);

temp_question = new QuestionModel;
temp_question.number = 5;
temp_question.body = "How do you treat your diabetes? Check all that apply";
temp_question.choices = ["a", "b", "c", "d"];
temp_question.correct_answer = [];
temp_question.max_answers = -1;
questions.push(temp_question);

temp_question = new QuestionModel;
temp_question.number = 6;
temp_question.body = "What does hyperglycemia mean?";
temp_question.choices = ["a", "b", "c", "d"];
temp_question.correct_answer = ["c"];
temp_question.max_answers = 1;
questions.push(temp_question);

temp_question = new QuestionModel;
temp_question.number = 7;
temp_question.body = "What are the symptoms of hyperglycemia? Check all that apply";
temp_question.choices = ["a", "b", "c", "d"];
temp_question.correct_answer = ["c", "d"];
temp_question.max_answers = -1;
questions.push(temp_question);

diabetes_test.name = "Diabetes";
diabetes_test.questions = questions;
diabetes_test.save();
