var socket = io();

socket.on('connect', () => {
  console.log('Conected to the server');

//   socket.emit('createMessage', {
//       from: 'Mark',
//       text: 'Hey. This is Mark'
//   });

});

socket.on('disconnect', (socket) => {
  console.log('Disconnected from the server');
});

socket.on('newMessage', function (message) {
    console.log(message);
});
