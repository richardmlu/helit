var mongoose = require('mongoose');

/*
 * ~~User Schema~~
 * first_name - first name
 * last_name - last name
 * id - unique patient ID
 * tests - all of user's recorded tests
 * {
 *  date: Number, //unix timestamp
 *  score: Number //calculated overall score
 *  name: testname,
 *  answers: [answer, answer, answer]
 * }
 * answer: {
 *   question_number: question id,
 *   priorityScore: Number, //priority score for doctors to bring up with patients
 *   answer: []
 * }
 *
 */
var UserSchema = mongoose.Schema({
	first_name: String,
	last_name: String,
	id: {
		type: String,
		unique: true
	},
	tests: Array
});

var UserModel = mongoose.model('User', UserSchema);

module.exports.UserModel = UserModel;
