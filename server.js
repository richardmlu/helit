//packages
var bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    express = require('express'),
    session = require('express-session'),
    http = require('http'),
    app = express(),
    server = http.createServer(app),
    io = require('socket.io')(server),
    db;

//models
var TestModel = require('./TestSchema').TestModel,
    QuestionModel = require('./TestSchema').QuestionModel,
    UserModel = require('./UserSchema').UserModel;

mongoose.connect('mongodb://localhost/helit');
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() { console.log('connected'); });

//express middleware setup
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'jade');
app.use(session({ secret: 'foodupzzz', cookie: { maxAge: 60000 }}));

var sessions = [];

//socket.io setup
io.on('connection', function(socket) {
  socket.on('test', function(data) {
	console.log(data);
  });

  socket.on('start', function(data) {
	console.log("Test start request received:");
	console.log(data);

	//check if patient exists
	UserModel.findOne({id: data.id}, function(err, user) {
		if(err) {
			console.log("ERROR: patient lookup failed");
			socket.emit('test_start', {
				status: 'error',
				msg: 'patient lookup failed'
			});

			return;
		}

		if(!user) {
			console.log("ERROR: patient not found");
			socket.emit('test_start', {
				'status': 'error',
				msg: 'patient not found'
			});
			return;
		}

		sessions.push({
			socket: this,
			id: data.id,
			test_name: data.test_type
		});

		TestModel.findOne({'name': data.test_type}, function(err, docs) {
			socket.emit('test_start', {
				status: 'success',
				test: docs
			});
		});
	});

  });

  socket.on('test_submit', function(data) {
	for(var i = 0; i < sessions.length; i++) {
		if(sessions[i].socket === this) {
			console.log("Saving user test submission...");

			(function(testname) {
				UserModel.findOne({id: sessions[i].id}, function(err, user) {
					if(err) { console.log(err); return; }

					user.tests.push({
						name: testname,
						answers: data
					});

					user.save(function(err) {
						if(err) {
							console.log("Test submission failed...");
							return err;
						}

						console.log("test saved");
					});
				});		
			}(sessions[i].test_name));	
		}
	}
  });
});

//start server
server.listen(8000);

//express functions
app.get('/TestSetup', function(req, res) {
  res.render('setup.jade');
});

app.get('/RegisterPatient', function(req, res) {
	res.render('register_patient.jade');
});

app.get('/reporting', function(req, res) {
	res.render('reporting.jade');
});

app.post('/RegisterPatient', function(req, res) {
	var newUser = new UserModel({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		id: parseInt(req.body.id),
		tests: []
	});	

	newUser.save(function(err) {
		var msg; 
		if(err) {
			msg = "failure";
		} else {
			msg = "success";
		}

		res.json({
			msg: msg	
		});
	});
});

app.post('/PatientSearch', function(req, res) {
	console.log(req.body);

	UserModel.findOne({id: req.body.id}, function(err, user){
		if(err) {
			console.log("ERROR: patient search failed");
			res.json({
				status: 'failure',
				msg: err
			});

			return;
		}

		if(!user) {
			console.log("ERROR: patient search failed");
			res.json({
				status: 'failure',
				msg: 'Patient not found'
			});

			return;
		}

		res.json({
			status: 'success',
			results: user.tests
		});
	});
});
