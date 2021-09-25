module.exports = (io, socket) => {
    const sendMessage = (data) => {
        let today = new Date();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        io.sockets.in(socket.Room).emit('server:send-message', {
            timeCurrent: time,
            data,
            name: socket.Username,
            messageColor: socket.messageColor,
            avatar: socket.avatar
        });
    };

    socket.on('client:send-message', sendMessage);
}