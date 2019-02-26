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
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
});


$('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function(data) {
        console.log('Test');
    });
});