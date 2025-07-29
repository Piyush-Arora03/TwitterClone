const connectToDatabase = require('./config/database');
const express = require('express');
const app=express();
const { PORT } = require('./config/server-config');

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Connecting to database...`);
    connectToDatabase();
    console.log(`Database connected successfully`);
});