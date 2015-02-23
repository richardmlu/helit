var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
	first_name: String,
	last_name: String,
	id: Number
});

var UserModel = mongoose.model('User', UserSchema);

module.exports.UserModel = UserModel;
