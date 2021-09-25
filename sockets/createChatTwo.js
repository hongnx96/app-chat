module.exports = (io, socket) => {
    const joinChatTwo = (data) => {
        socket.emit('server:join-chat-two-user-success', data);
        io.to(data.id).emit('server:accept-chat-two', {
            name: socket.Username,
            id: socket.id,
            avatar: socket.avatar
        });
    }
    socket.on('client:join-chat-two-user', joinChatTwo);
}