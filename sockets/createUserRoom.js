module.exports = (io, socket, rooms, users) => {
    //console.log(io);
    const registerUserRoom = (data) => {
        
        //console.log('users', users);
        const result = findUser(users, data.name);
        //console.log(result);
        if(!result) {
            if(data.room) {
                //console.log('co room');
                socket.Room = data.room;
                socket.Username = data.name;
                socket.messageColor = data.messageColor;
                socket.avatar = data.avatar;
                users.push({
                    name: data.name,
                    id: socket.id,
                    room: data.room,
                    avatar: data.avatar
                });
                socket.join(data.room);
                if(rooms.indexOf(data.room) === -1) {
                    rooms.push(data.room);
                }
                socket.emit('server:register-success', data);
                //users = users.filter(user => user.name !== data.name);
                io.sockets.emit('server:list-all', {
                    numberOnline: users.length - 1,
                    rooms,
                    users
                });
            } else {
                //console.log('ko room');
                socket.Username = data.name;
                socket.nameColor = data.nameColor;
                socket.avatar = data.avatar;
                users.push({
                    name: data.name,
                    id: socket.id,
                    avatar: data.avatar
                });
    
                //users = users.filter(user => user.id !== socket.id);
                socket.emit('server:register-success', data);
                io.sockets.emit('server:list-all', {
                    userId: socket.id,
                    numberOnline: users.length - 1,
                    users,
                    rooms
                })
            }
        } else {
            socket.emit('server:notification-user-exist', `${data.name} exist!!!`);
        }
        //console.log(io.sockets.clients());
    }

    socket.on('client:register-user', registerUserRoom);

    const findUser = (users, name) => {
        let check = false;
        users.forEach((user) => {
            //console.log('for', user);
            if(user.name == name) {
                check = true;
            }
        });
        return check;
    }
}