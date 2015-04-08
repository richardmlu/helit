var TestModel = require('./TestSchema').TestModel,
    QuestionModel = require('./TestSchema').QuestionModel,
    mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/healit');

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
temp_question.category = "Personal";
temp_question.priority = 5;
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
temp_question.category = "Info";
temp_question.priority = 3;
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
temp_question.category = "Info";
temp_question.priority = 5;
temp_question.body = "What is the cure for diabetes?";
temp_question.choices = [
  { 
    text: "Diet",
    correct: false,
    value: 0 
  }, 
  {
    text: "Exercise", 
    correct: false,
    value: 0
  },
  {
    text: "Drugs",
    correct: false,
    value: 0
  },
  {
    text: "Surgery",
    correct: false,
    value: 0
  },
  {
    text: "There is no cure",
    correct: true,
    value: 5
  }

];
temp_question.max_answers = -1;
questions.push(temp_question);

temp_question = new QuestionModel;
temp_question.number = 4;
temp_question.category = "Info";
temp_question.priority = 5;
temp_question.body = "How can you treat diabetes?";
temp_question.choices = [
  { 
    text: "Diet",
    correct: true,
    value: 2 
  }, 
  {
    text: "Exercise", 
    correct: true,
    value: 2
  },
  {
    text: "Drugs",
    correct: true,
    value: 1
  },
  {
    text: "Surgery",
    correct: false,
    value: 0
  },
  {
    text: "There are no treatments",
    correct: false,
    value: 0
  }

];
temp_question.max_answers = -1;
questions.push(temp_question);

temp_question = new QuestionModel;
temp_question.number = 5;
temp_question.category = "Personal";
temp_question.priority = 2;
temp_question.body = "How do you treat your diabetes?";
temp_question.choices = [
  { 
    text: "Diet",
    correct: false,
    value: 0 
  }, 
  {
    text: "Exercise", 
    correct: false,
    value: 0
  },
  {
    text: "Drugs",
    correct: false,
    value: 0
  },
  {
    text: "Nothing",
    correct: false,
    value: 0
  },
];
temp_question.max_answers = -1;
questions.push(temp_question);

temp_question = new QuestionModel;
temp_question.number = 6;
temp_question.category = "Info";
temp_question.priority = 2;
temp_question.body = "What does hyperglycemia mean?";
temp_question.choices = [
  { 
    text: "High blood sugar",
    correct: true,
    value: 2
  }, 
  {
    text: "Low blood sugar", 
    correct: false,
    value: 0
  },
  {
    text: "Having too much energy",
    correct: false,
    value: 0
  },
];
temp_question.max_answers = 1;
questions.push(temp_question);

temp_question = new QuestionModel;
temp_question.number = 7;
temp_question.category = "Info";
temp_question.priority = 4;
temp_question.body = "What are the symptoms of hyperglycemia?";
temp_question.choices = [
  { 
    text: "Lots of energy",
    correct: false,
    value: 0 
  }, 
  {
    text: "Low energy", 
    correct: false,
    value: 0
  },
  {
    text: "Hunger",
    correct: false,
    value: 0
  },
  {
    text: "Being more thirsty",
    correct: true,
    value: 0.25
  },
  {
    text: "Peeing more often",
    correct: true,
    value: 0.25
  },
  { 
    text: "Fatigue",
    correct: true,
    value: 0.25
  }, 
  { 
    text: "Headache",
    correct: true,
    value: 0.25 
  }, 
  { 
    text: "Racing heart",
    correct: false,
    value: 0
  }, 
  { 
    text: "Blurred-vision",
    correct: true,
    value: 0.25
  }, 
  { 
    text: "Fruity-smelling breath",
    correct: true,
    value: 0.5
  }, 
  { 
    text: "Sweet taste in the mouth",
    correct: false,
    value: 0 
  }, 
  { 
    text: "Pale skin",
    correct: false,
    value: 0 
  }, 
  { 
    text: "Shaking",
    correct: false,
    value: 0 
  }, 
  { 
    text: "Sweating",
    correct: false,
    value: 0 
  }, 
  { 
    text: "Sudden mood changes",
    correct: false,
    value: 0 
  }, 
  { 
    text: "Sudden nervousness",
    correct: false,
    value: 0 
  }, 
  { 
    text: "Nausea",
    correct: true,
    value: 0.25 
  }, 
  { 
    text: "Vomiting",
    correct: true,
    value: 0.5 
  }, 
  { 
    text: "Difficulty breathing",
    correct: true,
    value: 0.5 
  }, 
  { 
    text: "Numbness",
    correct: false,
    value: 0 
  }, 
  { 
    text: "Dry mouth",
    correct: true,
    value: 0.25
  }, 
  { 
    text: "Weakness",
    correct: true,
    value: 0.25
  }, 
  { 
    text: "Confusion",
    correct: true,
    value: 0.5
  }, 
  { 
    text: "Abdominal Pain",
    correct: true,
    value: 0.5
  }, 
  { 
    text: "Loss of consciousness",
    correct: false,
    value: 0 
  }, 
  { 
    text: "Coma",
    correct: true,
    value: 0.5 
  }, 
];
temp_question.max_answers = -1;
questions.push(temp_question);

temp_question = new QuestionModel;
temp_question.number = 8;
temp_question.category = "Personal";
temp_question.priority = 4;
temp_question.body = "Which symptoms of hyperglycemia have you felt?";
temp_question.choices = [
  {
    text: "Being more thirsty",
    correct: false,
    value: 0
  },
  {
    text: "Peeing more often",
    correct: false,
    value: 0
  },
  { 
    text: "Fatigue",
    correct: false,
    value: 0
  }, 
  { 
    text: "Headache",
    correct: false,
    value: 0
  },  
  { 
    text: "Blurred-vision",
    correct: false,
    value: 0
  }, 
  { 
    text: "Fruity-smelling breath",
    correct: false,
    value: 0
  }, 
  { 
    text: "Nausea",
    correct: false,
    value: 0
  }, 
  { 
    text: "Vomiting",
    correct: false,
    value: 0
  }, 
  { 
    text: "Difficulty breathing",
    correct: false,
    value: 0
  }, 
  { 
    text: "Dry mouth",
    correct: false,
    value: 0
  }, 
  { 
    text: "Weakness",
    correct: false,
    value: 0
  }, 
  { 
    text: "Confusion",
    correct: false,
    value: 0
  }, 
  { 
    text: "Abdominal Pain",
    correct: false,
    value: 0
  }, 
  { 
    text: "Coma",
    correct: false,
    value: 0
  }, 
];
temp_question.max_answers = -1;
questions.push(temp_question);

temp_question = new QuestionModel;
temp_question.number = 9;
temp_question.category = "Info";
temp_question.priority = 3;
temp_question.body = "What does hypoglycemia mean?";
temp_question.choices = [
  { 
    text: "High blood sugar",
    correct: false,
    value: 0
  }, 
  {
    text: "Low blood sugar", 
    correct: true,
    value: 2
  },
  {
    text: "Having too much energy",
    correct: false,
    value: 0
  },
];
temp_question.max_answers = 1;
questions.push(temp_question);

temp_question = new QuestionModel;
temp_question.number = 10;
temp_question.category = "Info";
temp_question.priority = 5;
temp_question.body = "What are the symptoms of hypoglycemia?";
temp_question.choices = [
  { 
    text: "Lots of energy",
    correct: false,
    value: 0 
  }, 
  {
    text: "Low energy", 
    correct: true,
    value: 0.5
  },
  {
    text: "Hunger",
    correct: true,
    value: 0.25
  },
  {
    text: "Being more thirsty",
    correct: false,
    value: 0
  },
  {
    text: "Peeing more often",
    correct: false,
    value: 0
  },
  { 
    text: "Fatigue",
    correct: true,
    value: 0.5
  }, 
  { 
    text: "Headache",
    correct: true,
    value: 0.5
  }, 
  { 
    text: "Racing heart",
    correct: true,
    value: 0.5
  }, 
  { 
    text: "Blurred-vision",
    correct: true,
    value: 0.25
  }, 
  { 
    text: "Fruity-smelling breath",
    correct: false,
    value: 0
  }, 
  { 
    text: "Sweet taste in the mouth",
    correct: false,
    value: 0 
  }, 
  { 
    text: "Pale skin",
    correct: true,
    value: 0.5
  }, 
  { 
    text: "Shaking",
    correct: true,
    value: 0.5
  }, 
  { 
    text: "Sweating",
    correct: true,
    value: 0.5
  }, 
  { 
    text: "Sudden mood changes",
    correct: true,
    value: 0.5 
  }, 
  { 
    text: "Sudden nervousness",
    correct: true,
    value: 0.5
  }, 
  { 
    text: "Nausea",
    correct: true,
    value: 0.25 
  }, 
  { 
    text: "Vomiting",
    correct: false,
    value: 0
  }, 
  { 
    text: "Difficulty breathing",
    correct: false,
    value: 0 
  }, 
  { 
    text: "Numbness",
    correct: true,
    value: 0.5
  }, 
  { 
    text: "Dry mouth",
    correct: false,
    value: 0
  }, 
  { 
    text: "Weakness",
    correct: true,
    value: 0.5
  }, 
  { 
    text: "Confusion",
    correct: true,
    value: 0.25
  }, 
  { 
    text: "Abdominal Pain",
    correct: false,
    value: 0
  }, 
  { 
    text: "Loss of consciousness",
    correct: true,
    value: 0.5
  }, 
  { 
    text: "Coma",
    correct: true,
    value: 0.5 
  }, 
];
temp_question.max_answers = -1;
questions.push(temp_question);

temp_question = new QuestionModel;
temp_question.number = 11;
temp_question.category = "Personal";
temp_question.priority = 5;
temp_question.body = "Which symptoms of hypoglycemia have you felt?";
temp_question.choices = [ 
  {
    text: "Low energy", 
    correct: true,
    value: 0.5
  },
  {
    text: "Hunger",
    correct: true,
    value: 0.25
  },
  {
    text: "Peeing more often",
    correct: false,
    value: 0
  },
  { 
    text: "Fatigue",
    correct: true,
    value: 0.5
  }, 
  { 
    text: "Headache",
    correct: true,
    value: 0.5
  }, 
  { 
    text: "Racing heart",
    correct: true,
    value: 0.5
  }, 
  { 
    text: "Blurred-vision",
    correct: true,
    value: 0.25
  }, 
  { 
    text: "Pale skin",
    correct: true,
    value: 0.5
  }, 
  { 
    text: "Shaking",
    correct: true,
    value: 0.5
  }, 
  { 
    text: "Sweating",
    correct: true,
    value: 0.5
  }, 
  { 
    text: "Sudden mood changes",
    correct: true,
    value: 0.5 
  }, 
  { 
    text: "Sudden nervousness",
    correct: true,
    value: 0.5
  }, 
  { 
    text: "Nausea",
    correct: true,
    value: 0.25 
  }, 
  { 
    text: "Numbness",
    correct: true,
    value: 0.5
  }, 
  { 
    text: "Weakness",
    correct: true,
    value: 0.5
  }, 
  { 
    text: "Confusion",
    correct: true,
    value: 0.25
  }, 
  { 
    text: "Loss of consciousness",
    correct: true,
    value: 0.5
  }, 
  { 
    text: "Coma",
    correct: true,
    value: 0.5 
  }, 
];
temp_question.max_answers = -1;
questions.push(temp_question);


diabetes_test.name = "Diabetes";
diabetes_test.questions = questions;
diabetes_test.save();
