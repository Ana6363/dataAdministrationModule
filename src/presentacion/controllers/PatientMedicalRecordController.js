const PatientMedicalRecordService = require('../../application/PatientMedicalRecordService');
const PatientMedicalRecordModel = require('../../domain/models/PatientMedicalRecordModel');

class PatientMedicalRecordController {
    static async updatePatientMedicalRecord(req, res) {
        try {
            const { recordNumber, allergies, medicalConditions, fullName } = req.body;

            if (!recordNumber || !allergies || !medicalConditions || !fullName) {
                return res.status(400).json({ error: 'Record number, allergies, medical conditions, and full name are required.' });
            }

            const patientMedicalRecord = await PatientMedicalRecordModel.update({ recordNumber, allergies, medicalConditions, fullName });

            console.log('Patient medical record updated:', patientMedicalRecord);

            return res.status(201).json({
                message: 'Patient medical record updated successfully.',
                patientMedicalRecord,
            });
        }
        catch (error) {
            console.error('Error updating patient medical record:', error);
            return res.status(500).json({
                error: 'Failed to update patient medical record.',
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

}

module.exports = PatientMedicalRecordController;