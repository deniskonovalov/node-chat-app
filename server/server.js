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

    socket.on('disconnect', (socket) => {
        console.log('Client was disconnected from the server');
    });
});


server.listen(port, () => {
    console.log(`App running on port ${port}`);
});

