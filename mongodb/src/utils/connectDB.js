const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_DB_CLOUD);
        console.log('connected to mongoDB ...')
    }catch (err) {
        console.error('Error');
    }
}

module.exports = connectDB

