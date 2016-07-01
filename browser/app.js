/*whiteboard.on('draw', function(){
  console.log('drawing');
});
*/

var socket = io(window.location.origin);

socket.on('connect', function () {
    console.log('I have made a persistent two-way connection to the server!');
});

socket.on('disconnection', function(){
  console.log('someone disconnected');
  //console.log(message);
});

