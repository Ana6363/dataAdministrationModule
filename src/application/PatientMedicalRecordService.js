const PatientMedicalRecordModel = require('../domain/models/PatientMedicalRecordModel');
const mongoose = require('mongoose');
const PatientMedicalRecordRepository = require('../infrastructure/repositories/PatientMedicalRecordRepository');


class PatientMedicalRecordService {
    
    static async updatePatientMedicalRecord(data) {
        const { recordNumber, medicalConditions, allergies, fullName } = data;
    
        // Validate that the recordNumber and at least one field to update are provided
        if (!recordNumber || (!medicalConditions && !allergies && !fullName)) {
            throw new Error('Record number and at least one field to update (medicalConditions, allergies, or fullName) are required.');
        }
    
        console.log("DEBUG: Fetching medical record by recordNumber:", recordNumber);
    
        // Fetch the existing medical record by record number
        const existingRecord = await PatientMedicalRecordRepository.findByRecordNumber(recordNumber);
    
        if (!existingRecord) {
            throw new Error(`Patient medical record with recordNumber ${recordNumber} not found.`);
        }
    
        console.log("DEBUG: Existing medical record fetched:", existingRecord);
    
        // Update medicalConditions if provided and different
        if (medicalConditions && JSON.stringify(medicalConditions) !== JSON.stringify(existingRecord.medicalConditions)) {
            console.log("DEBUG: Updating medicalConditions from", existingRecord.medicalConditions, "to", medicalConditions);
            existingRecord.medicalConditions = medicalConditions;
        }
    
        // Update allergies if provided and different
        if (allergies && JSON.stringify(allergies) !== JSON.stringify(existingRecord.allergies)) {
            console.log("DEBUG: Updating allergies from", existingRecord.allergies, "to", allergies);
            existingRecord.allergies = allergies;
        }
    
        // Update fullName if provided and different
        if (fullName && fullName !== existingRecord.fullName) {
            console.log("DEBUG: Updating fullName from", existingRecord.fullName, "to", fullName);
            existingRecord.fullName = fullName;
        }
    
        // Save the updated record
        try {
            const updatedRecord = await existingRecord.save();
            console.log("DEBUG: Updated medical record saved successfully:", updatedRecord);
            return updatedRecord;
        } catch (error) {
            console.error("ERROR: Failed to save updated medical record:", error.message);
            throw new Error(`Failed to update patient medical record: ${error.message}`);
        }
    }
    
    
    
    static async deletePatientMedicalRecord(recordNumber) {
        if (!recordNumber) {
            throw new Error('Record number is required to delete.');
        }

        const deletePatientMedicalRecord = await PatientMedicalRecordRepository.deleteByRecordNumber(recordNumber);

        if (!deletePatientMedicalRecord) {
            throw new Error('Patient medical record not found.');
        }

        // Delete the patient medical record
        return { message: 'Patient medical record deleted successfully',deletePatientMedicalRecord };
    }

    

    static async getAllPatientMedicalRecords() {
        try {
            console.log("Fetching all patient medical records from the database...");
            const patientMedicalRecords = await PatientMedicalRecordModel.find();
            console.log("Fetched patient medical records:", patientMedicalRecords);
            return patientMedicalRecords;
        } catch (error) {
            console.error("Error fetching patient medical records:", error);
            throw error;
        }
    }

    static async getPatientMedicalRecordByRecordNumber(recordNumber) {
        try {
            console.log("Fetching patient medical record by record number from the database...");
            const patientMedicalRecord = await PatientMedicalRecordService.findByRecordNumber(recordNumber);
            console.log("Fetched patient medical record:", patientMedicalRecord);
            return patientMedicalRecord;
        } catch (error) {
            console.error("Error fetching patient medical record:", error);
            throw error;
        }
    }
}

module.exports = PatientMedicalRecordService;