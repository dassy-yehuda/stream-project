const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require("path");
const request = require("request");
const cookieParser = require('cookie-parser')
const dotenv = require("dotenv");
const apiRouter = require("./routes/api")
const { socketServer } = require('./webSocket');
socketServer(http);
const { connectDB } = require('./db');
connectDB();
let senderStream
const viewsRouter = require('./routes/views');
const webrtc = require("wrtc");
app.use('/api', apiRouter)
dotenv.config();
app.use(cookieParser());
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, './build')));

// app.use('/', (req, res) => {
//   console.log("🚀 ~ file: index.js ~ line 33 ~ app.get ~ req")
//   // res.redirect("https://accounts.codes/meet/login");
// });
app.post("/consumer", async ({ body }, res) => {
  console.log("aaaaaaaaaaaaaaa");
  const peer = new webrtc.RTCPeerConnection({
    iceServers: [
      {
        urls: "stun:stun.stunprotocol.org"
      }
    ]
  });
  console.log(body);
  const desc = new webrtc.RTCSessionDescription(body.sdp);
  await peer.setRemoteDescription(desc);
  senderStream.getTracks().forEach(track => peer.addTrack(track, senderStream));
  const answer = await peer.createAnswer();
  await peer.setLocalDescription(answer);
  const payload = {
    sdp: peer.localDescription
  }

  res.json(payload);
});

app.post('/broadcast', async ({ body }, res) => {
  console.log("bbbbbbbbbbbbbbbbbbbbb");
  console.log(body);
  const peer = new webrtc.RTCPeerConnection({
    iceServers: [
      {
        urls: "stun:stun.stunprotocol.org"
      }
    ]
  });
  peer.ontrack = (e) => handleTrackEvent(e, peer);
  const desc = new webrtc.RTCSessionDescription(body.sdp);
  await peer.setRemoteDescription(desc);
  const answer = await peer.createAnswer();
  await peer.setLocalDescription(answer);
  const payload = {
    sdp: peer.localDescription
  }

  res.json(payload);
});

function handleTrackEvent(e, peer) {
  debugger
  senderStream = e.streams[0];
};


app.use('/*', viewsRouter)


module.exports = {
  app,
  http,
}


http.listen(process.env.PORT, function () {
  console.log('listening on :', process.env.PORT);
});

