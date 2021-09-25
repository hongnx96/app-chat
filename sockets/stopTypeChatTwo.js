module.exports = (socket) =>  {
    const stopType = () => {
        socket.broadcast.emit('server:i-stopped-typing-chat-room', socket.Username);
    }
    socket.on('client:i-stopped-typing-chat-room', stopType);
}