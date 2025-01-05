const PatientMedicalRecordService = require('../../application/PatientMedicalRecordService');
const PatientMedicalRecordModel = require('../../domain/models/PatientMedicalRecordModel');

class PatientMedicalRecordController {
    static async updatePatientMedicalRecord(req, res) {
        try {
            const { recordNumber, allergies, medicalConditions, fullName } = req.body;
    
            // Validate input
            if (!recordNumber || !Array.isArray(allergies) || !Array.isArray(medicalConditions) || !fullName) {
                return res.status(400).json({
                    error: 'Record number, allergies (as array), medical conditions (as array), and full name are required.',
                });
            }
    
            // Pass the data to the service for updating
            const updatedRecord = await PatientMedicalRecordService.updatePatientMedicalRecord({
                recordNumber,
                allergies,
                medicalConditions,
                fullName,
            });
    
            // Return the updated record
            return res.status(200).json({
                message: 'Patient medical record updated successfully.',
                patientMedicalRecord: updatedRecord,
            });
        } catch (error) {
            console.error('Error updating patient medical record:', error);
            return res.status(500).json({
                error: 'Failed to update patient medical record.',
                details: error.message,
            });
        }
    }    

    static async deletePatientMedicalRecord(req, res) {
        try {
            const { recordNumber } = req.body;

            if (!recordNumber) {
                return res.status(400).json({ error: 'Record number is required to delete a patient medical record.' });
            }

            const patientMedicalRecordDeleted = await PatientMedicalRecordService.deletePatientMedicalRecord(recordNumber);

            if (!patientMedicalRecordDeleted) {
                return res.status(404).json({
                    error: 'Patient medical record not found.',
                });
            }

            return res.status(200).json({
                message: 'Patient medical record deleted successfully.',
                patientMedicalRecord: patientMedicalRecordDeleted,
            });

        } catch (error) {
            console.error('Error deleting patient medical record:', error);

            return res.status(500).json({
                error: 'Failed to delete patient medical record.',
                details: error.message,
            });
        }
    }

    static async getAllPatientMedicalRecords(req, res) {
        try {
            // Fetch patient medical records from the service
            const patientMedicalRecords = await PatientMedicalRecordService.getAllPatientMedicalRecords();

            // Send the fetched patient medical records in the response
            return res.status(200).json({
                message: 'All patient medical records fetched successfully.',
                data: patientMedicalRecords,
            });
        } catch (error) {
            console.error('Error in getAllPatientMedicalRecords controller:', error);

            // Send an error response
            return res.status(500).json({
                error: 'Failed to fetch patient medical records.',
                details: error.message,
            });
        }
    }

    static async getPatientMedicalRecordByRecordNumber(req, res) {
        try {
            const { recordNumber } = req.params;

            if (!recordNumber) {
                return res.status(400).json({ error: 'Record number is required to fetch a patient medical record.' });
            }

            const patientMedicalRecord = await PatientMedicalRecordService.getPatientMedicalRecordByRecordNumber(recordNumber);

            if (!patientMedicalRecord) {
                return res.status(404).json({
                    error: 'Patient medical record not found.',
                });
            }

            return res.status(200).json({
                message: 'Patient medical record fetched successfully.',
                data: patientMedicalRecord,
            });

        } catch (error) {
            console.error('Error fetching patient medical record by record number:', error);

            return res.status(500).json({
                error: 'Failed to fetch patient medical record.',
                details: error.message,
            });
        }
    }

    static async createMultiplePatientMedicalRecords(req, res) {
        try {
            const records = req.body.records; // Expecting an array of { recordNumber, fullName }
    
            if (!Array.isArray(records) || records.length === 0) {
                return res.status(400).json({ error: "A list of records is required." });
            }
    
            const { createdRecords, errors } = await PatientMedicalRecordService.createMultiplePatientMedicalRecords(records);
    
            return res.status(200).json({
                message: "Patient medical records processed.",
                createdRecords,
                errors,
            });
        } catch (error) {
            console.error("Error creating multiple patient medical records:", error);
            return res.status(500).json({
                error: "Failed to create patient medical records.",
                details: error.message,
            });
        }
    }
    

}

module.exports = PatientMedicalRecordController;