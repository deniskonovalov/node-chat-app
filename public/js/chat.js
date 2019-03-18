const socket = io();

const scrollToBottom = () => {
    let messages = $('#messages');
    let newMessage = messages.children('li:last-child')
    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let NewMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + NewMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
};

socket.on('connect', () => {
  console.log('Conected to the server');
});

socket.on('disconnect', (socket) => {
  console.log('Disconnected from the server');
});

socket.on('newMessage', function (message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = $('#message-template').html();

    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime,
    });

    $('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function(message) {
    // let li = $('<li></li>');
    // let a = $('<a target="_blank">My current location</a>');
    // let formattedTime = moment(message.createdAt).format('h:mm a');

    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr('href', message.url);

    // li.append(a);
    // $('#messages').append(li);
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = $('#location-message-template').html();

    let html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime,
    });

    $('#messages').append(html);

});

$('#message-form').on('submit', function(e) {
    e.preventDefault();

    const messageTextbox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function() {
        messageTextbox.val('')
    });
});

const locationButton = $('#send-location');
    locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
  }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.');
  });
});