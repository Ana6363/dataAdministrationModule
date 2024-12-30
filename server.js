require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import the cors package
const connectToDatabase = require('./src/infrastructure/DbConnection/MongoConnection');

const app = express();

// Configure CORS
app.use(cors({
    origin: 'https://localhost:3000', // Replace with your React app's domain
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

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
