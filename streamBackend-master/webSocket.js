const socketIo = require('socket.io');

const { onWebSocketConnection } = require('./routes/socket.route');
let io = socketIo();
const setSocket = () => {
    io.on('connection', (socket) => {
        // console.log(socket);
        onWebSocketConnection(socket, io)
        console.log("socket is connecting")
    });
}

module.exports = {
    socketServer: (app) => {
        // console.log(app);
        io = socketIo(app);
        setSocket();
    }
};
