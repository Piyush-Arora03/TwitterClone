const dotenv=require('dotenv');
dotenv.config();

module.exports={
    PORT: process.env.PORT,
    MONGOOSE_URI: process.env.MONGOOSE_URI
}