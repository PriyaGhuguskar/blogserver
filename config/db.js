const mongoose = require('mongoose');
const colors = require('colors');
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('connected to MongoDb');
    } catch (error) {
        console.log('mongo connect error')
    }
}

module.exports = connectDB;