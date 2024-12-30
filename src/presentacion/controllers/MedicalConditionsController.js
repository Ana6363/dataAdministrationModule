const MedicalConditionsService = require('../../application/MedicalConditionsService');
const MedicalConditionsModel = require('../../domain/models/MedicalConditionsModel');

class MedicalConditionsController {
    static async createMedicalCondition(req, res) {
        try {
            const { name, description } = req.body;

            if (!name || !description) {
                return res.status(400).json({ error: 'Name and description are required.' });
            }
            const medicalCondition = await MedicalConditionsModel.create({ name, description });

            console.log('Medical condition created:', medicalCondition);

            return res.status(201).json({
                message: 'Medical condition created successfully.',
                medicalCondition,
            });
        } catch (error) {
            console.error('Error creating medical condition:', error);
            return res.status(500).json({
                error: 'Failed to create medical condition.',
                details: error.message,
            });
        }
    }

    static async getAllMedicalConditions(req, res) {
        try {
            // Fetch medical conditions from the service
            const medicalConditions = await MedicalConditionsService.getAllMedicalConditions();

            // Send the fetched medical conditions in the response
            return res.status(200).json({
                message: 'All medical conditions fetched successfully.',
                data: medicalConditions,
            });
        } catch (error) {
            console.error('Error in getAllMedicalConditions controller:', error);

            // Send an error response
            return res.status(500).json({
                error: 'Failed to fetch medical conditions.',
                details: error.message,
            });
        }
    }

    static async updateMedicalCondition(req, res) {
        try {
            const { name, description } = req.body;

            if (!name || !description) {
                return res.status(400).json({ error: 'Name and description are required.' });
            }

            const medicalConditionUpdated = await MedicalConditionsService.updateMedicalCondition({ name, description });

            return res.status(200).json({
                message: 'Medical condition updated successfully.',
                medicalCondition: medicalConditionUpdated,
            });
        } catch (error) {
            console.error('Error updating medical condition:', error);

            return res.status(500).json({
                error: 'Failed to update medical condition.',
                details: error.message,
            });
        }
    }

    static async deleteMedicalCondition(req, res) {
        try {
            const { name } = req.body;

            if (!name) {
                return res.status(400).json({ error: 'Name is required to delete a medical condition.' });
            }

            const medicalConditionDeleted = await MedicalConditionsService.deleteMedicalCondition(name);

            if (!medicalConditionDeleted) {
                return res.status(404).json({
                    error: 'Medical condition not found.',
                });
            }

            return res.status(200).json({
                message: 'Medical condition deleted successfully.',
                medicalCondition: medicalConditionDeleted,
            });
        } catch (error) {
            console.error('Error deleting medical condition:', error);

            return res.status(500).json({
                error: 'Failed to delete medical condition.',
                details: error.message,
            });
        }
    }

}

module.exports = MedicalConditionsController;