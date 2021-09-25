module.exports = (io, socket) => {
    const checkType = (id) => {
        io.to(id).emit('server:i-am-typing-chat-two', socket.Username);
    };
    socket.on('client:i-am-typing-chat-two', checkType);
}