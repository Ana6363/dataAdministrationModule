const PatientMedicalRecordModel = require('../domain/models/PatientMedicalRecordModel');
const mongoose = require('mongoose');
const PatientMedicalRecordRepository = require('../infrastructure/repositories/PatientMedicalRecordRepository');


class PatientMedicalRecordService {
    static async updatePatientMedicalRecord(data) {
        const { recordNumber, medicalConditions, allergies } = data;
    
        console.log("DEBUG: Received data for update:", data);
    
        // Validate input
        if (!recordNumber) {
            throw new Error('Record number is required.');
        }
        if (!Array.isArray(medicalConditions)) {
            throw new Error('Medical conditions must be an array.');
        }
        if (!Array.isArray(allergies)) {
            throw new Error('Allergies must be an array.');
        }
    
        // Fetch the existing record
        const existingRecord = await PatientMedicalRecordRepository.findByRecordNumber(recordNumber);
        if (!existingRecord) {
            throw new Error('Patient medical record not found.');
        }
    
        console.log("DEBUG: Existing record for update:", existingRecord);
    
        // Merge new allergies and medical conditions without duplicates
        const updatedAllergies = Array.from(new Set([...existingRecord.allergies, ...allergies]));
        const updatedMedicalConditions = Array.from(new Set([...existingRecord.medicalConditions, ...medicalConditions]));
    
        // Update the record in the database
        const updatedRecord = await PatientMedicalRecordModel.findOneAndUpdate(
            { recordNumber },
            {
                $set: {
                    allergies: updatedAllergies,
                    medicalConditions: updatedMedicalConditions
                }
            },
            { new: true } // Return the updated document
        );
    
        if (!updatedRecord) {
            throw new Error('Failed to update patient medical record.');
        }
    
        console.log("DEBUG: Updated record:", updatedRecord);
    
        return updatedRecord;
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