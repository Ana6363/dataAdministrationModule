const AllergyModel = require('../domain/models/AllergyModel');
const mongoose = require('mongoose');


class AllergyService {
    static async createAllergy(req, res) {
        try {
            const { name, description } = req.body;

            // Validate input
            if (!name || !description) {
                return res.status(400).json({ error: 'Name and description are required.' });
            }

            // Simulate allergy creation (e.g., save to a database)
            const allergy = { name, description };

            console.log('Allergy created:', allergy);

            // Return success response
            return res.status(201).json({
                message: 'Allergy created successfully.',
                allergy,
            });
        } catch (error) {
            console.error('Error creating allergy:', error);

            // Return error response
            return res.status(500).json({ error: 'Failed to create allergy.' });
        }
    }

    static async getAllAllergies() {
        try {
            console.log("Fetching all allergies from the database...");
            const allergies = await AllergyModel.find();
            console.log("Fetched allergies:", allergies);
            return allergies;
        } catch (error) {
            console.error("Error fetching allergies:", error);
            throw error;
        }
    }
}

module.exports = AllergyService;
