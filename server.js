var path = require('path');

var http = require('http');
var server = http.createServer();

var express = require('express');
var app = express();

var socketio = require('socket.io');

server.on('request', app);
var io = socketio(server);


var gh = io.of('/gracehopper');
var home = io.of('/');

setInterval(function(){
  home.clients(function(error, clients){
  if(error) return console.error;
  console.log(clients);
})
},2000);

var homeCurrentDrawing = [];
var ghCurrentDrawing = [];

home.on('connection', function(socket){

  socket.emit('newconnection', homeCurrentDrawing);
  console.log('a new client has connected');
  console.log(socket.id);

  socket.on('disconnect', function(){
    //console.log('disconnected');
    home.emit('disconnection');
  });
  socket.on('drawing', function(coordinates){
    homeCurrentDrawing.push(coordinates);
    socket.broadcast.emit('sending coordinates', coordinates)
  })

});


gh.on('connection', function(socket){
  //var currentDrawing = [];
  socket.emit('newconnection', ghCurrentDrawing);
  console.log('a new client has connected');
  console.log(socket.id);

  socket.on('disconnect', function(){
    //console.log('disconnected');
    gh.emit('disconnection');
  });
  socket.on('drawing', function(coordinates){
    ghCurrentDrawing.push(coordinates);
    socket.broadcast.emit('sending coordinates', coordinates)
  })

});


server.listen(1337, function () {
    console.log('The server is listening on port 1337!');
});

app.use(express.static(path.join(__dirname, 'browser')));

app.get('/gracehopper', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/fullstack', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});


