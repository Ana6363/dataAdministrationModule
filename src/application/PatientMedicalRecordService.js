const PatientMedicalRecordModel = require('../domain/models/PatientMedicalRecordModel');
const mongoose = require('mongoose');

class PatientMedicalRecordService {
    static async updatePatientMedicalRecord(req, res) {
        try {
            const { recordNumber, medicalConditions, allergies, fullName } = req.body;

            // Validate input
            if (!recordNumber || !medicalConditions || !allergies || !fullName) {
                return res.status(400).json({ error: 'Record number, medical conditions, allergies and full name are required.' });
            }

            // Update patient medical record
            const updatedRecord = await PatientMedicalRecordModel.findOneAndUpdate(
                { recordNumber },
                { medicalConditions, allergies, fullName },
                { new: true }
            );

            if (!updatedRecord) {
                return res.status(404).json({ error: 'Patient medical record not found.' });
            }

            console.log('Patient medical record updated:', updatedRecord);

            // Return success response
            return res.status(200).json({
                message: 'Patient medical record updated successfully.',
                updatedRecord,
            });
        } catch (error) {
            console.error('Error updating patient medical record:', error);

            // Return error response
            return res.status(500).json({ error: 'Failed to update patient medical record.' });
        }
    }

    /*static async searchPatientMedicalRecords(req, res) {
        try {
            const { recordNumber } = req.query;

            // Validate input
            if (!recordNumber) {
                return res.status(400).json({ error: 'Patient ID is required.' });
            }

            // Search for patient medical records
            const patientMedicalRecords = await PatientMedicalRecordModel.find({ recordNumber });

            if (patientMedicalRecords.length === 0) {
                return res.status(404).json({ error: 'No patient medical records found.' });
            }

            console.log('Patient medical records found:', patientMedicalRecords);

            // Return success response
            return res.status(200).json({
                message: 'Patient medical records found successfully.',
                patientMedicalRecords,
            });
        } catch (error) {
            console.error('Error searching for patient medical records:', error);

            // Return error response
            return res.status(500).json({ error: 'Failed to search for patient medical records.' });
        }
    }*/

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
}

module.exports = PatientMedicalRecordService;