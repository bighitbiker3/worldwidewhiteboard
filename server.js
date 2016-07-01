var path = require('path');

var http = require('http');
var server = http.createServer();

var express = require('express');
var app = express();

var socketio = require('socket.io');

server.on('request', app);
var io = socketio(server);

io.on('connection', function(socket){
  console.log('a new client has connected');
  console.log(socket.id);

  socket.on('disconnect', function(){
    //console.log('disconnected');
    io.emit('disconnection');
  });
  socket.on('drawing', function(coordinates){
    socket.broadcast.emit('sending coordinates', coordinates)
  })

});


server.listen(1337, function () {
    console.log('The server is listening on port 1337!');
});

app.use(express.static(path.join(__dirname, 'browser')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
