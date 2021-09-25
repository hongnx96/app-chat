module.exports = (socket) => {
    const disconnect = () => {
        console.log(socket.id + ' disconnect!!');
    }
    socket.on('disconnect', disconnect);
}