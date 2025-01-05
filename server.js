require('dotenv').config();
const express = require('express');
const connectToDatabase = require('./src/infrastructure/DbConnection/MongoConnection');

const app = express();

app.use(express.json());

// Import routes
const routes = require('./src/presentacion/routes/routes');
app.use('/api', routes); // Prefix all routes with /api

async function startServer() {
    try {
        console.log('Connecting to the database...');
        await connectToDatabase();
        console.log('Database connected successfully.');

        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start the application:', error);
        process.exit(1); // Exit the application if initialization fails
    }
}

startServer();
