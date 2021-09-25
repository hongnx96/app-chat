const express = require('express');
const logger = require('morgan');

const checkTypeChatTwo = require('./sockets/checkTypeChatTwo');
const checkTypeRoom = require('./sockets/checkTypeRoom');
const createChatTwo = require('./sockets/createChatTwo');
const createUserRoom = require('./sockets/createUserRoom');
const disconnect = require('./sockets/disconnect');
const logout = require('./sockets/logout');
const selectRoom = require('./sockets/selectRoom');
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
    sendMessageChatTwo(io, socket);
    sendMessageRoom(io, socket);
    stopTypeChatTwo(socket);
    stopTypeRoom(io, socket);
};

io.on('connection', onConnection);

server.listen(5000, () => console.log('Server listening on port 5000'));