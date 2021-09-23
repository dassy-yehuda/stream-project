const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { keys } = require('./config/keys');

dotenv.config();

const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

const connectDB = () => {
    mongoose.connect(keys.API_URL_STREAM, connectionParams)
        .then(() => {
            console.log('MongoDB Connection Succeeded.');
        })
        .catch((error) => {
            console.log('Error in DB connection: ' + error)
        });
}

module.exports = {
    connectDB,
}
