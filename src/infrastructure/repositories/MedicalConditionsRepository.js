const MedicalCondition = require('../../domain/models/MedicalConditionsModel');

class MedicalConditionsRepository {
    static async createMedicalCondition(data) {
        const medicalCondition = new MedicalCondition(data);
        return await medicalCondition.save();
    }

    static async findByName(name) {
        return await MedicalCondition.findOne({ name });
    }
    
    static async getAllMedicalConditions() {
        return await MedicalCondition.find(); // Fetch all documents in the medical conditions collection
    }
}

module.exports = MedicalConditionsRepository;