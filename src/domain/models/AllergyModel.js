const mongoose = require('mongoose');

const AllergyModel = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
}, { timestamps: true });

const Allergy = mongoose.model('Allergy', AllergyModel);
module.exports = Allergy;
