const path = require('path');
const express = require('express');
const app = express();
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);
app.use(express.static(publicPath));


io.on('connection', (socket) => {
    console.log('New user connected');


    socket.emit('newMessage', {
        from: "Denis",
        text: "Hello! My name is Denis",
        createdAt: 123
    });

    socket.on('disconnect', (socket) => {
        console.log('Client was disconnected from the server');
    });

    socket.on('createMessage', (newMessage) => {
        console.log(newMessage.from, newMessage.text    );
    });
});


server.listen(port, () => {
    console.log(`App running on port ${port}`);
});

