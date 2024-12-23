const AllergyService = require('../../application/AllergyService');

class AllergyController {
    static async createAllergy(req, res) {
        try {
            const { name, description } = req.body;

            if (!name || !description) {
                return res.status(400).json({ error: 'Name and description are required.' });
            }

            // Create the allergy using the AllergyService
            const allergy = await AllergyService.createAllergy(name, description);

            // Send feedback message
            await sendFeedbackMessage({ success: 201, message: 'Allergy added successfully.' });

            // Return success response
            return res.status(201).json({ message: 'Allergy created successfully.', allergy });
        } catch (error) {
            // Handle errors
            console.error('Error creating allergy:', error);

            // Optionally send failure feedback
            await sendFeedbackMessage({
                success: 400,
                message: `Failed to add allergy: ${error.message}`,
            });

            return res.status(400).json({ error: error.message });
        }
    }

    static async getAllAllergies(req, res) {
        try {
            const allergies = await AllergyService.getAllAllergies();
            return res.status(200).json({ message: 'All allergies fetched successfully.', data: allergies });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = AllergyController;
