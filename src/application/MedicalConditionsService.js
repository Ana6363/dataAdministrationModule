const MedicalConditionsModel = require('../domain/models/MedicalConditionsModel');
const mongoose = require('mongoose');
const MedicalConditionsRepository = require('../infrastructure/repositories/MedicalConditionsRepository');

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

    static async updateMedicalCondition(data) {
        const { name, description } = data;

        if (!name && !description) {
            throw new Error('At least one field (name or description) is required to update.');
        }

        const existingMedicalCondition = await MedicalConditionsRepository.findByName(data.name);

        if (!existingMedicalCondition) {
            throw new Error('Medical condition not found.');
        }

        if (description && description !== existingMedicalCondition.description) {
            existingMedicalCondition.description = description;
        }

        // Save and return the updated medical condition
        return await existingMedicalCondition.save();
    }

    static async deleteMedicalCondition(name) {
        if (!name) {
            throw new Error('Name is required to delete a medical condition.');
        }

        // Simulate medical condition deletion (e.g., remove from a database)
        const deletedMedicalCondition = await MedicalConditionsRepository.deleteByName(name);

        console.log('Medical condition deleted:', deletedMedicalCondition);

        // Return success response
        return { message: 'Medical condition deleted successfully.', deletedMedicalCondition };
    }

    static async getMedicalConditionByName(name) {
        if (!name) {
            throw new Error('Name is required to fetch a medical condition.');
        }

        // Simulate fetching a medical condition by name (e.g., from a database)
        const medicalCondition = await MedicalConditionsRepository.findByName(name);

        console.log('Fetched medical condition:', medicalCondition);

        // Return the fetched medical condition
        return medicalCondition;
    }
}

module.exports = MedicalConditionsService;