module.exports = (io, socket) => {
    const sendMessageChatTwo = (data) => {
        let today = new Date();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        io.to(socket.id).to(data.id).emit('server:send-message-chat-two', {
            message: data.message,
            name: socket.Username,
            time,
            avatar: socket.avatar
        });
    };
    socket.on('client:send-message-chat-two', sendMessageChatTwo);
}