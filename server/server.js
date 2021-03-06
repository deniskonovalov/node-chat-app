const path = require('path');
const express = require('express');
const app = express();
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);
const {generateMessage, generateLocationMessage} = require('./utils/message');

app.use(express.static(publicPath));


io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User joined to the chat'));
    
    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('Message from the server.');
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', `${coords.latitude}, ${coords.longitude}`));
    });

    socket.on('disconnect', (socket) => {
        console.log('Client was disconnected from the server');
    });
});


server.listen(port, () => {
    console.log(`App running on port ${port}`);
});

