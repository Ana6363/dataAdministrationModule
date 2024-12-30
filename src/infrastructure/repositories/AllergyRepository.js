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
        return await Allergy.find();
    }

    static async updateAllergy(id, data) {
        return await Allergy.findByIdAndUpdate(id, data, { new: true });
    }

    static async findByName(name) {
        return await Allergy.findOne({ name });
    }
    
    static async deleteByName(name) {
        return await Allergy.findOneAndDelete({ name });
    }
}

module.exports = AllergyRepository;
