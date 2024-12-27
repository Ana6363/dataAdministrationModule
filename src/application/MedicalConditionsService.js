const MedicalConditionsModel = require('../domain/models/MedicalConditionsModel');
const mongoose = require('mongoose');

class MedicalConditionsService {
    static async createMedicalCondition(req, res) {
        try {
            const { name, description } = req.body;

            // Validate input
            if (!name || !description) {
                return res.status(400).json({ error: 'Name and description are required.' });
            }

            // Simulate medical condition creation (e.g., save to a database)
            const medicalCondition = { name, description };

            console.log('Medical condition created:', medicalCondition);

            // Return success response
            return res.status(201).json({
                message: 'Medical condition created successfully.',
                medicalCondition,
            });
        } catch (error) {
            console.error('Error creating medical condition:', error);

            // Return error response
            return res.status(500).json({ error: 'Failed to create medical condition.' });
        }
    }

    static async getAllMedicalConditions() {
        try {
            console.log("Fetching all medical conditions from the database...");
            const medicalConditions = await MedicalConditionsModel.find();
            console.log("Fetched medical conditions:", medicalConditions);
            return medicalConditions;
        } catch (error) {
            console.error("Error fetching medical conditions:", error);
            throw error;
        }
    }
}

module.exports = MedicalConditionsService;