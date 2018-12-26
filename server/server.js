const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
let {
    generatemessage,
    generateLocationMessage
} = require('./utilits/generatemessage');
let app = express();
let server = http.createServer(app);
let port = 4800;
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User Joined');

    socket.emit('newMail', generatemessage('Admin', 'Welcome To App'));

    socket.broadcast.emit('newMail', generatemessage('Admin', 'New User Joined'));

    socket.on('createMail', (mail, callback) => {
        console.log(mail);
        io.emit('newMail', generatemessage(mail.from, mail.text));
        callback('This is from server');
    });

    socket.on('sendLocation', (coords) => {
        io.emit('newLocation', generateLocationMessage('Admin', coords.lat, coords.lang));
    });

    socket.on('disconnect', () => {
        console.log('User Disconnect');
    });

});

server.listen(port, () => {
    console.log('Server is running on ' + port);
});