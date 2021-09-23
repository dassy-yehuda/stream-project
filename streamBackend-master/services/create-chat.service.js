/* socket object may be used to send specific messages to the new connected client */
const connectToChat = (socket) => {
    console.log('new client connected');
    socket.emit('connection', null);
}
const sendMessage = (socket, data, io) => {
    console.log("send message", data.message.messageText);
    console.log(data.userName);
    console.log("io.sockets.adapter.rooms.get(data.userName).admin", io.sockets.adapter.rooms.get(data.userName).admin);
    io.to(io.sockets.adapter.rooms.get(data.userName).admin).emit('message-to-admin', data.message.messageText);
}
const sendMessageToAll = (socket, data, io) => {
    console.log(data, data.data);
    // console.log("send message to all", data.messageToShare.data);
    io.emit('receive-message-to-all', data.messageToShare.data);
}


module.exports = {
    connectToChat,
    sendMessage,
    sendMessageToAll

}

