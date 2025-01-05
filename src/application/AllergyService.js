
const AllergyRepository = require('../infrastructure/repositories/AllergyRepository');
const AllergyModel = require('../domain/models/AllergyModel');
const mongoose = require('mongoose');



class AllergyService {
    static async createAllergy(req, res) {
        try {
            const { name, description, status } = req.body;

            if (!name || !description) {
                return res.status(400).json({ error: 'Name and description are required.' });
            }

            const allergy = { name, description, status };
            console.log('Allergy created:', allergy);

            return res.status(201).json({
                message: 'Allergy created successfully.',
                allergy,
            });
        } catch (error) {
            console.error('Error creating allergy:', error);
            return res.status(500).json({ error: 'Failed to create allergy.' });
        }
    }

    static async getAllAllergies() {
        try {
            const allergies = await AllergyRepository.getAllAllergies();
            console.log('Fetched allergies:', allergies);
            return allergies;
        } catch (error) {
            console.error('Error fetching allergies:', error);
            throw error;
        }
    }
    static async updateAllergy(data) {
        const { name, description} = data;
    
        if (!name && !description) {
            throw new Error('At least one field (name or description) is required to update.');
        }
    
        const existingAllergy = await AllergyRepository.findByName(data.name);
    
        if (!existingAllergy) {
            throw new Error('Allergy not found.');
        }
    
        if (description && description !== existingAllergy.description) {
            existingAllergy.description = description;
        }
    
        // Save and return the updated allergy
        return await existingAllergy.save();
    }


    static async deleteAllergy(name) {
        if (!name) {
            throw new Error('Name is required to delete an allergy.');
        }

        const deletedAllergy = await AllergyRepository.deleteByName(name);

        if (!deletedAllergy) {
            throw new Error('Allergy not found.');
        }

        return deletedAllergy;
    }
    
}

module.exports = AllergyService;
