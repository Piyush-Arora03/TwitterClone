const express = require('express');
const { PORT } = require('./config/server-config');
const connectToDatabase = require('./config/database');
const apiRoutes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

const startServer = async () => {
    try {
        console.log('Connecting to the database...');
        await connectToDatabase();
        console.log('Connected to the database successfully');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error);
        process.exit(1); // Exit the process if DB connection fails
    }
};

startServer();
