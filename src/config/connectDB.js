const mongoose = require('mongoose');
const dotenv = require("dotenv");

let connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Kết nối tới mongodb thành công hehe');
    } catch (error) {
        console.error('Unable to connect to MongoDB:', error);
    }
}

module.exports = connectDB;
