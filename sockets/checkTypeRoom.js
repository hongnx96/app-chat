module.exports = (socket) => {
    const checkType = () => {
        socket.broadcast.in(socket.Room).emit('server:i-am-typing-chat-room', socket.Username);
    }
    socket.on('client:i-am-typing-chat-room', checkType);
}