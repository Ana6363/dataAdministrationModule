const express = require('express');
const mongoose = require('mongoose');
const AllergyController = require('../controllers/AllergyController');
const MedicalConditionsController = require('../controllers/MedicalConditionsController');

const router = express.Router();

app.use(express.json());

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

// Medical conditions
router.post('/medical-conditions', MedicalConditionsController.createMedicalCondition);
router.get('/medical-conditions', MedicalConditionsController.getAllMedicalConditions);

module.exports = router;
