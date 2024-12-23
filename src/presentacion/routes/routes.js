const express = require('express');
const mongoose = require('mongoose');
const AllergyController = require('../controllers/AllergyController');

const router = express.Router();

router.get('/status', (req, res) => {
    res.status(200).json({ message: 'API is running!' });
});




router.get('/db-status', async (req, res) => {
    const dbState = mongoose.connection.readyState;
    const states = {
        0: 'Disconnected',
        1: 'Connected',
        2: 'Connecting',
        3: 'Disconnecting',
    };

    res.status(200).json({
        message: 'MongoDB connection status',
        status: states[dbState],
    });
});

// Allergies
router.post('/allergies', AllergyController.createAllergy);
router.get('/allergies', AllergyController.getAllAllergies);

module.exports = router;
