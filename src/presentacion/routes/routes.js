const express = require('express');
const mongoose = require('mongoose');
const AllergyController = require('../controllers/AllergyController');
const MedicalConditionsController = require('../controllers/MedicalConditionsController');
const PatientMedicalRecordController = require('../controllers/PatientMedicalRecordController');

const router = express.Router();

// Status check endpoint
router.get('/status', (req, res) => {
    res.status(200).json({ message: 'API is running!' });
});

// Database status check
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
router.put('/allergies', AllergyController.updateAllergy);
router.delete('/allergies', AllergyController.deleteAllergy);

// Medical Conditions
router.post('/medical-conditions', MedicalConditionsController.createMedicalCondition);
router.get('/medical-conditions', MedicalConditionsController.getAllMedicalConditions);

// Patient Medical Records
router.put('/patient-medical-records', PatientMedicalRecordController.updatePatientMedicalRecord);
router.get('/patient-medical-records', PatientMedicalRecordController.getAllPatientMedicalRecords);

module.exports = router;
