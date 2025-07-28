const mongoose = require('mongoose');
const {MONGOOSE_URI}=require('./server-config');

const connectToDatabase = async () => {
    await mongoose.connect(MONGOOSE_URI);
}

module.exports = connectToDatabase;