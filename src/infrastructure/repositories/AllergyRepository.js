const Allergy = require('../../domain/models/allergyModel');

class AllergyRepository {
    static async createAllergy(data) {
        const allergy = new Allergy(data);
        return await allergy.save();
    }

    static async findByName(name) {
        return await Allergy.findOne({ name });
    }
    
    static async getAllAllergies() {
        return await Allergy.find(); // Fetch all documents in the allergies collection
    }
}


module.exports = AllergyRepository;
