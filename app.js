const express = require('express');
const logger = require('morgan');
const fs = require('fs');

const checkTypeChatTwo = require('./sockets/checkTypeChatTwo');
const checkTypeRoom = require('./sockets/checkTypeRoom');
const createChatTwo = require('./sockets/createChatTwo');
const createUserRoom = require('./sockets/createUserRoom');
const disconnect = require('./sockets/disconnect');
const logout = require('./sockets/logout');
const selectRoom = require('./sockets/selectRoom');
const sendPhotoChatTwo = require('./sockets/sendPhotoChatTwo');
const sendMessageChatTwo = require('./sockets/sendMessageChatTwo');
const sendMessageRoom = require('./sockets/sendMessageRoom');
const stopTypeChatTwo = require('./sockets/stopTypeChatTwo');
const stopTypeRoom = require('./sockets/stopTypeRoom');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static('public'));
app.use(logger('dev'));

app.get('/', (req, res) => {
    res.render('index.html');
});

let rooms = [];
let users = [];

const onConnection = (socket) => {
    console.log(socket.id, 'connected!!!');
    checkTypeChatTwo(io, socket);
    checkTypeRoom(socket);
    createChatTwo(io, socket);
    createUserRoom(io, socket, rooms, users);
    disconnect(socket);
    logout(socket, rooms, users);
    selectRoom(io, socket, rooms, users);
    sendPhotoChatTwo(io, socket);
    sendMessageChatTwo(io, socket);
    sendMessageRoom(io, socket);
    stopTypeChatTwo(socket);
    stopTypeRoom(io, socket);

    // socket.on('client:send-photo-chat-two', (data) => {
    //     let today = new Date();
    //     let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    //     const buffer = Buffer.from(data.photo, 'base64');
    //     fs.writeFile(__dirname + '/public/photos', buffer, err => {
    //         if(err != null) {
    //             console.log(err);
    //         } else {
    //             io.to(socket.id).to(data.id).emit('server:send-photo-chat-two', {
    //                 photo: data.photo.toString('base64'),
    //                 name: socket.Username,
    //                 time,
    //                 avatar: socket.avatar
    //             });
    //         }
    //     });
    // });
};

io.on('connection', onConnection);

server.listen(5000, () => console.log('Server listening on port 5000'));