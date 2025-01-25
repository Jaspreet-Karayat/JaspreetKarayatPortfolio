const mongoose = require('mongoose');
require('dotenv').config();

const URL = process.env.MONGODB_URI;

const ConnectDB = async () => {
    try {
        await mongoose.connect(URL);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log(`MongoDB Connection Error: ${err}`);
        process.exit(1);
    }
};

module.exports = ConnectDB;