const socket = io();

socket.on('connect', () => {
  console.log('Conected to the server');
});

socket.on('disconnect', (socket) => {
  console.log('Disconnected from the server');
});

socket.on('newMessage', function (message) {
    let li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
    console.log(message);
    let li = $('<li></li>');
    let a = $('<a target="_blank">My current location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);

    li.append(a);
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

const locationButton = $('#location-button');

locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Cant get geolocation');
    }
    
    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });        
    }, function() {
        alert('Unable to fetch location');
    });
});