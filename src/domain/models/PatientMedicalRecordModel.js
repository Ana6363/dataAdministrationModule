const mongoose = require('mongoose');

const PatientMedicalRecordModel = new mongoose.Schema({
    recordNumber: { type: String, required: true, unique: true },
    medicalConditions: { type: Array, required: true },
    allergies: { type: Array, required: true },
    fullName: { type: String, required: true },
}, { timestamps: true });

const PatientMedicalRecord = mongoose.model('PatientMedicalRecord', PatientMedicalRecordModel);
module.exports = PatientMedicalRecord;