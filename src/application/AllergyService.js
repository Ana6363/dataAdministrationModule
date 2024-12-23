const AllergyModel = require('../domain/models/allergyModel');
const mongoose = require('mongoose');


class AllergyService {
    static async createAllergy(name, description) {

        if (!name || !description) {
            console.error("Validation failed: Missing 'name' or 'description'.");
            throw new Error('Name and description are required.');
        }

        console.log("Mongoose connection status:", mongoose.connection.readyState);

        const allergy = new AllergyModel({ name, description });

        try {
            console.log("Attempting to save allergy:", allergy);
            await allergy.save();
            console.log("Allergy saved successfully:", allergy);
            return allergy;
        } catch (error) {
            console.error("Error saving allergy:", error);
            throw error;
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
