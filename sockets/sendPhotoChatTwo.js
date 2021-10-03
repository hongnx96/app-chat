const fs = require('fs');

module.exports = (io, socket) => {
    const sendPhotoChatTwo = (data) => {
        console.log(data);
        let today = new Date();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const buffer = Buffer.from(data.photo, 'base64');
        fs.writeFile('./public/photos', buffer, err => {
            if(err != null) {
                console.log(err);
            } else {
                io.to(socket.id).to(data.id).emit('server:send-photo-chat-two', {
                    photo: data.photo.toString('base64'),
                    name: socket.Username,
                    time,
                    avatar: socket.avatar
                });
            }
        });
    };
    socket.on('client:send-photo-chat-two', sendPhotoChatTwo);
}