const PatientMedicalRecord = require('../../domain/models/PatientMedicalRecordModel');

class PatientMedicalRecordRepository {
    static async updatePatientMedicalRecord(data) {
        const patientMedicalRecord = new PatientMedicalRecord(data);
        return await patientMedicalRecord.save();
    }

    static async findByRecordNumber(recordNumber) {
        return await PatientMedicalRecord.findOne({ recordNumber });
    }
    
    static async getAllPatientMedicalRecords() {
        return await PatientMedicalRecord.find(); // Fetch all documents in the patientMedicalRecords collection
    }
    static async deleteByRecordNumber(recordNumber) {
        return await PatientMedicalRecord.findOneAndDelete({ recordNumber });
    }    

    
}
module.exports = PatientMedicalRecordRepository;
