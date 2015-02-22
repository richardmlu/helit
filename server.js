//packages
var bodyParser = require('body-parser'),
    express = require('express'),
    session = require('express-session'),
    http = require('http'),
    app = express(),
    server = http.createServer(app),
    io = require('socket.io')(server);

//express middleware setup
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'jade');
app.use(session({ secret: 'foodupzzz', cookie: { maxAge: 60000 }}));

//socket.io setup
io.on('connection', function(socket) {
  socket.on('joined', function(data) {
  });

  socket.on('remove_player', function(data) {
  });

  socket.on('answer', function(data) {
  });
});

//start server
server.listen(8000);

//express functions
app.get('/', function(req, res) {
  res.render('index.jade');
});

app.get('/testBroadcast', function(req, res) {
  broadcastPlayers("test", {msg: "hello players"});
});
