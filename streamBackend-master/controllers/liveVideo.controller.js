const LiveVideo = require('../models/liveVideo.model');

const createVideo = async (req, res) => {
    try {
        const video = req.body
        newVideo = new LiveVideo(video)
        await newVideo.save();
        res.status(200).send({ message: "save video", newVideo: newVideo });
    }
    catch (error) {
        console.log("Can't save this video with error: " + error);
    }
}
module.exports = {
    createVideo,
};