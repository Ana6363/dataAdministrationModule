const AllergyService = require('../../application/AllergyService');
const AllergyModel = require('../../domain/models/allergyModel');

class AllergyController {
    static async createAllergy(req, res) {
        try {
            const { name, description} = req.body;

            if (!name || !description) {
                return res.status(400).json({ error: 'Name and description are required.' });
            }
            const status = "Meaningful";
            const allergy = await AllergyModel.create({ name, description, status });

            console.log('Allergy created:', allergy);

            return res.status(201).json({
                message: 'Allergy created successfully.',
                allergy,
            });
        } catch (error) {
            console.error('Error creating allergy:', error);
            return res.status(500).json({
                error: 'Failed to create allergy.',
                details: error.message,
            });
        }
    }

    static async getAllAllergies(req, res) {
        try {
            const allergies = await AllergyService.getAllAllergies();

            return res.status(200).json({
                message: 'All allergies fetched successfully.',
                data: allergies,
            });
        } catch (error) {
            console.error('Error in getAllAllergies controller:', error);

            return res.status(500).json({
                error: 'Failed to fetch allergies.',
                details: error.message,
            });
        }
    }

    static async updateAllergy(req, res) {
        try {
            const { name, description } = req.body;
    
            if (!name && !description) {
                return res.status(400).json({ error: 'At least one field (name or description) is required to update.' });
            }
    
            const updatedAllergy = await AllergyService.updateAllergy({ name, description});
    
            return res.status(200).json({
                message: 'Allergy updated successfully.',
                allergy: updatedAllergy,
            });
        } catch (error) {
            console.error('Error updating allergy:', error);
            return res.status(500).json({
                error: 'Failed to update allergy.',
                details: error.message,
            });
        }
    }

    static async deleteAllergy(req, res) {
        try {
            const { name } = req.body;

            if (!name) {
                return res.status(400).json({ error: 'Name is required to delete an allergy.' });
            }

            const deletedAllergy = await AllergyService.deleteAllergy(name);

            if (!deletedAllergy) {
                return res.status(404).json({ error: 'Allergy not found.' });
            }

            return res.status(200).json({
                message: 'Allergy deleted successfully.',
                allergy: deletedAllergy,
            });
        } catch (error) {
            console.error('Error deleting allergy:', error);
            return res.status(500).json({
                error: 'Failed to delete allergy.',
                details: error.message,
            });
        }
    }
}

module.exports = AllergyController;
