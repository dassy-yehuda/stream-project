const mongoose = require('mongoose');

const liveVideoSchema = mongoose.Schema({
    videoLiveName: {
        type: String,
    },
    date: {
        type: Date,
    },
    length: {
        type: String,
    },
    url: {
        type: String,
        require: true
    },
    usersName:
    {
        type: String,
    },
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hangout‎' },


})

module.exports = mongoose.model('liveVideo', liveVideoSchema)