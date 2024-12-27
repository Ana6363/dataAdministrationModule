const mongoose = require('mongoose');

const MedicalConditionsModel = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
}, { timestamps: true });

const MedicalConditions = mongoose.model('MedicalCondition', MedicalConditionsModel);
module.exports = MedicalConditions;