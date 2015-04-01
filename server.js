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
    console.log("Saving user test submission...");
    for(var i = 0; i < sessions.length; i++) {
      if(sessions[i].id === data.id) {
        console.log("correct session found");

        (function(testname) {
          UserModel.findOne({id: sessions[i].id}, function(err, user) {
            if(err) { console.log(err); return; }

            user.tests.push({
              name: testname,
              answers: data.answers
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
  //make it work with all tests later
  //also async it
  TestSchema.findOne({name: "Diabetes"}, function(err, test) {
    UserModel.findOne({id: req.body.id}, function(err, user){
      //patient search failed
      if(err) {
        console.log("ERROR: patient search failed");
        return res.json({
          status: 'failure',
          msg: err
        });
      }

      //patient not found 
      if(!user) {
        console.log("ERROR: patient not found");
        return res.json({
          status: 'failure',
          msg: 'Patient not found'
        });
      }

      /**  calculate reporting values  **/
      var lastVisitPercentChange,
          firstVisitPercentChange,
          priorityConcerns,
          scorePlots;

      ////  % diff from last visit
      //sort by date
      user.tests.sort(function(a, b) {
        if(a.date < b.date)
          return -1;
        else if(a.date > b.date)
          return 1;
        else
          return 0;
      });  

      //get most recent 2 tests and calculate % difference
      lastVisitPercentChange = (user.tests[0].score - user.tests[1].score) / user.tests[0].score * 100;

      //% diff from first visit
      lastVisitPercentChange = (user.tests[0].score - user.tests[user.tests.length-1].score) / user.tests[0].score * 100;

      //// Priority concerns  
      // Sort by priority index
      var lastTest = user.tests[0];
      lastTest.answers.sort(function(a, b){ 
        if(a.priorityScore < b.priorityScore)
          return -1;
        else if(a.priorityScore > b.priorityScore) 
          return 1;
        else
          return 0;
      });

      // Combine user answers with test questions
      var priorityConcerns = lastTest.answers.slice();
      for(var i = 0; i < priorityConcerns.length; i++) {
        //find corresponding test question
        var qi;
        for(qi = 0; qi < test.questions.length; qi++) {
          if(test.questions[qi].number === priorityConcerns[i].id) {
            break; 
          }
        }

        priorityConcerns[i] = {
          question: test.questions[qi],
          answer: priorityConcerns[i]
        };
      }

      //// Graph - plot points for 'score'

      
      res.json({
        status: 'success',
        results: user.tests
      });
    });

  });
});
