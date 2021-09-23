const { keys } = require('../config/keys')
const LiveVideo = require('../models/liveVideo.model')
const room2 = ""
var request = require('request');


const createConversation = async (socket, data, io) => {
    const { room } = data;
    // room2 = room
    console.log(room);
    socket.join(room);
    console.log("socket.id", socket.id);
    const chatId = await createChat1()
    socket.emit('created', chatId);
    var room1 = io.sockets.adapter.rooms.get(room)
    room1.admin = socket.id

}
const createChat1 = async (req, res) => {
    console.log("createChat1");
    // const newLive = new LiveVideo()

    let chat = await createChat("ruth", "red", "ruth_hubara",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJHZ2JIV1p6NWxBWnJpdmlpZURXdk40dFE2WmEyIiwiZW1haWwiOiJydXRoaHViYXJhQGdtYWlsLmNvbSIsImlhdCI6MTYyNjE2MTU5N30.R6m78Ygu-k7caTtDS3jNvqh1nenla9uclK3ckhOaWhU", req)
    console.log(chat.new.hangout._id);
    return chat.new.hangout._id
    // newLive.chatId = chat.new.hangout._id
    // await newLive.save()
}

const createChat = (projectName, projectColor, userName, jwt, req) => {
    console.log("createChatFunction")
    console.log("projectColor : ", projectColor)
    return new Promise((resolve, reject) => {
        console.log(req);
        let url = keys.API_URL_CHAT + `api/${userName}/newHangout`
        let body = {
            hangout: {
                name: projectName,
                source: 'stream'
            },
            tabName: 'steram',
            colorHangout: projectColor
        }
        console.log(body);
        console.log(jwt)
        const options = {
            url: url,
            method: 'post',
            body: JSON.stringify(body),
            headers: {
                Authorization: jwt,
                Accept: 'application/json',
                "Content-Type": "application/json",
            }
        }
        request(options, (err, res, body) => {
            if (err)
                reject(err)
            console.log(body);
            let data = JSON.parse(body)
            console.log("date from create chat : ", data)
            resolve(data)
        })
    })
}


const setStream = (stream) => {
    console.log("on set stream!! ");
    console.log(stream)
}
const joinConversation = (socket, data, io) => {
    console.log(socket.id);
    console.log("hello", socket.conn.id);
    const { room } = data;
    console.log(room);
    console.log('join to room ', room);
    if (io.sockets.adapter.rooms.has(room)) {
        console.log("exist room!!")
        socket.join(room);
        socket.emit('joined', { room });
        console.log("num of client on the conversation " + io.sockets.adapter.rooms.get(room).size);
        let viewers = io.sockets.adapter.rooms.get(room).size
        io.emit("viewer", { viewers })

    }
    else {
        console.log("not exist room!")
        socket.emit('not exist room', { room });
    }
}
module.exports = {
    createConversation,
    joinConversation,
    setStream,

}
