module.exports = (socket, rooms, users) => {
    const logout = () => {
        for(let i = 0; i < users.length; i++) {
            if(users[i].name === socket.Username) {
                users.splice(i, 1);
            }
        }
        socket.broadcast.emit('server:list-all', {
            numberOnline: users.length - 1,
            rooms,
            users
        });
    };
    socket.on('client:user-logout', logout);
}