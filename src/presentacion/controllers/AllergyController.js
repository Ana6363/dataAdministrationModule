const AllergyService = require('../../application/AllergyService');
const AllergyModel = require('../../domain/models/allergyModel');

class AllergyController {
    static async createAllergy(req, res) {
        try {
            const { name, description } = req.body;
    
            if (!name || !description) {
                return res.status(400).json({ error: 'Name and description are required.' });
            }
            const allergy = await AllergyModel.create({ name, description });
    
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
            // Fetch allergies from the service
            const allergies = await AllergyService.getAllAllergies();
    
            // Send the fetched allergies in the response
            return res.status(200).json({
                message: 'All allergies fetched successfully.',
                data: allergies,
            });
        } catch (error) {
            console.error('Error in getAllAllergies controller:', error);
    
            // Send an error response
            return res.status(500).json({
                error: 'Failed to fetch allergies.',
                details: error.message,
            });
        }
    }
    
}

module.exports = AllergyController;
