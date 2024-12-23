require('dotenv').config();
const express = require('express');
const { processMessages } = require('./src/application/ServiceBusListener'); // Adjust the path as needed
const connectToDatabase  = require('./src/infrastructure/DbConnection/MongoConnection');

const app = express();

app.use(express.json());

// Routes
const AllergyController = require('./src/presentacion/controllers/AllergyController');
app.post('/api/allergies', AllergyController.createAllergy);
app.get('/api/allergies', AllergyController.getAllAllergies);

async function startServer() {
    try {
        console.log('Connecting to the database...');
        await connectToDatabase();
        console.log('Database connected successfully.');

        console.log('Starting Service Bus Listener...');
        processMessages().catch((error) => {
            console.error('Error starting Service Bus listener:', error);
        });

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start the application:', error);
        process.exit(1); // Exit the application if initialization fails
    }
}

startServer();
