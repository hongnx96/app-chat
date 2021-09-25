module.exports = (io, socket) =>  {
    const stopType = (id) => {
        io.to(id).emit('server:i-stopped-typing-chat-two', socket.Username);
    }
    socket.on('client:i-stopped-typing-chat-two', stopType);
}