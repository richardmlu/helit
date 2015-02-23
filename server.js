//packages
var bodyParser = require('body-parser'),
    express = require('express'),
    session = require('express-session'),
    http = require('http'),
    app = express(),
    server = http.createServer(app),
    io = require('socket.io')(server);

//models
var TestModel = require('./TestSchema').TestModel,
    QuestionModel = require('./TestSchema').QuestionModel,
    UserModel = require('./UserSchema').UserModel;

//express middleware setup
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'jade');
app.use(session({ secret: 'foodupzzz', cookie: { maxAge: 60000 }}));

//socket.io setup
io.on('connection', function(socket) {
  socket.on('test', function(data) {
	console.log(data);
  });

  socket.on('start', function(data) {
	console.log(data);
  });
});

//start server
server.listen(8000);

//express functions
app.get('/TestSetup', function(req, res) {
  res.render('setup.jade');
});
