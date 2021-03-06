var socket = io(window.location.pathname);

whiteboard.on('draw', function(last, current, color){
  socket.emit('drawing', {last: last, current: current, color: color})
});

socket.on('connect', function () {
    console.log('I have made a persistent two-way connection to the server!');

});

socket.on('newconnection', function(currentDrawing){
  currentDrawing.forEach(function(coordinate){
    whiteboard.draw(coordinate.last, coordinate.current, coordinate.color);
  })
})

socket.on('disconnection', function(){
  console.log('someone disconnected');
  //console.log(message);
});

socket.on('sending coordinates', function(data){
  console.log(data)
  whiteboard.draw(data.last, data.current, data.color);
});
