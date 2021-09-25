module.exports = (io, socket, rooms, users) => {
    const selectRoom = (data) => {
        socket.Room = data.room;
        socket.nameColor = data.nameColor;
        socket.join(data.room);
        users.map((user) => {
            if(user.name === data.name) {
                user.room = data.room;
            }
        });
        socket.emit('server:select-room-success', data.room);
        io.sockets.emit('server:list-all', {
            numberOnline: users.length - 1,
            rooms,
            users
        });
    }
    socket.on('client:select-room', selectRoom);
}