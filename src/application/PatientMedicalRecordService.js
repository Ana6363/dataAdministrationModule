const PatientMedicalRecordModel = require('../domain/models/PatientMedicalRecordModel');
const mongoose = require('mongoose');
const PatientMedicalRecordRepository = require('../infrastructure/repositories/PatientMedicalRecordRepository');


class PatientMedicalRecordService {

    static async updatePatientMedicalRecord(recordNumber, allergies, medicalConditions) {
        if (!recordNumber || !Array.isArray(allergies) || !Array.isArray(medicalConditions)) {
            throw new Error('Record number, allergies, and medical conditions are required and must be valid arrays.');
        }
    
        try {
            console.log('Updating patient medical record for recordNumber:', recordNumber);
    
            const patientRecord = await PatientMedicalRecordModel.findOne({ recordNumber });
    
            if (!patientRecord) {
                console.warn('Patient medical record not found for recordNumber:', recordNumber);
                return null;
            }
    
            // Update the fields
            patientRecord.allergies = allergies;
            patientRecord.medicalConditions = medicalConditions;
    
            const updatedRecord = await patientRecord.save();
            console.log('Patient medical record updated successfully:', updatedRecord);
    
            return updatedRecord;
        } catch (error) {
            console.error('Error updating patient medical record:', error);
            throw error;
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
            const patientMedicalRecords = await PatientMedicalRecordRepository.find();
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


    static async createMultiplePatientMedicalRecords(records) {
        console.log("DEBUG: Received records:", records);
    
        if (!Array.isArray(records) || records.length === 0) {
            throw new Error("A list of records with recordNumber and fullName is required.");
        }
    
        const createdRecords = [];
        const errors = [];
    
        for (const record of records) {
            const recordNumber = record.RecordNumber || record.recordNumber;
            const fullName = record.FullName || record.fullName;
    
            console.log("DEBUG: Normalized recordNumber:", recordNumber, "fullName:", fullName);
    
            if (!recordNumber || !fullName) {
                console.warn("DEBUG: Validation failed for record:", record);
                errors.push({ record, error: "Record number and full name are required." });
                continue;
            }
    
            try {
                console.log("DEBUG: Checking if record exists for recordNumber:", recordNumber);
                const existingRecord = await PatientMedicalRecordRepository.findByRecordNumber(recordNumber);
                console.log("DEBUG: Existing record for recordNumber:", recordNumber, existingRecord);
    
                if (existingRecord) {
                    console.warn("DEBUG: Record already exists for recordNumber:", recordNumber);
                    errors.push({ record, error: "Record with this record number already exists." });
                    continue;
                }
    
                console.log("DEBUG: Creating new record for:", { recordNumber, fullName });
                const newRecord = new PatientMedicalRecordModel({
                    recordNumber,
                    medicalConditions: [],
                    allergies: [],
                    fullName,
                });
    
                const savedRecord = await newRecord.save();
                console.log("DEBUG: Record saved successfully:", savedRecord);
                createdRecords.push(savedRecord);
            } catch (error) {
                console.error("ERROR: Failed to save record:", record, "Error:", error.message);
                errors.push({ record, error: error.message });
            }
        }
    
        console.log("DEBUG: Created records:", createdRecords);
        console.log("DEBUG: Errors:", errors);
    
        return { createdRecords, errors };
    }    
}

module.exports = PatientMedicalRecordService;