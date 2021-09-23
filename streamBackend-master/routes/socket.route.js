const { createConversation, joinConversation, joinAdmin, setStream } = require('../services/create-conversation.service');
const { sendMessage, sendMessageToAll } = require('../services/create-chat.service');
const ss = require('socket.io-stream');

const onWebSocketConnection = (socket, io) => {
    socket.on('send-message', (data) => {
        console.log('data from send message' + data);
        JSON.stringify(data)
        sendMessage(socket, data, io)
    });
    socket.on('send-message-to-all', (data) => {
        // console.log('from send-message-to-all:' + data.messageToShare.data);
        sendMessageToAll(socket, data, io)
    });

    socket.on('create', (data) => {


        createConversation(socket, data, io);
    });
    socket.on('selectParticipate', (data) => {
        sendJoinEmail(data.emailAddress, data.roomId, data.currentUser.email);
    });

    socket.on('join', (data) => {
        joinConversation(socket, data, io);
    });
    ss(socket).on('setStream', function (stream) {
        setStream(stream);

    });
}

module.exports = {
    onWebSocketConnection,
}