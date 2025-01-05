const PatientMedicalRecordService = require('../PatientMedicalRecordService');
const PatientMedicalRecordModel = require('../../domain/models/PatientMedicalRecordModel');
const PatientMedicalRecordRepository = require('../../infrastructure/repositories/PatientMedicalRecordRepository');

jest.mock('../../domain/models/PatientMedicalRecordModel');
jest.mock('../../infrastructure/repositories/PatientMedicalRecordRepository');
describe('PatientMedicalRecordService', () => {
    describe('updatePatientMedicalRecord', () => {
        it('should throw an error if recordNumber, allergies, or medicalConditions are invalid', async () => {
            await expect(PatientMedicalRecordService.updatePatientMedicalRecord(null, [], []))
                .rejects.toThrow('Record number, allergies, and medical conditions are required and must be valid arrays.');
        });

        it('should return null if patient record is not found', async () => {
            PatientMedicalRecordModel.findOne.mockResolvedValue(null);
            const result = await PatientMedicalRecordService.updatePatientMedicalRecord('123', [], []);
            expect(result).toBeNull();
        });

        it('should update and return the patient record if found', async () => {
            const mockRecord = { save: jest.fn().mockResolvedValue({}) };
            PatientMedicalRecordModel.findOne.mockResolvedValue(mockRecord);
            const result = await PatientMedicalRecordService.updatePatientMedicalRecord('123', ['pollen'], ['asthma']);
            expect(mockRecord.allergies).toEqual(['pollen']);
            expect(mockRecord.medicalConditions).toEqual(['asthma']);
            expect(result).toEqual({});
        });
    });

    describe('deletePatientMedicalRecord', () => {
        it('should throw an error if recordNumber is not provided', async () => {
            await expect(PatientMedicalRecordService.deletePatientMedicalRecord(null))
                .rejects.toThrow('Record number is required to delete.');
        });

        it('should throw an error if patient record is not found', async () => {
            PatientMedicalRecordRepository.deleteByRecordNumber.mockResolvedValue(null);
            await expect(PatientMedicalRecordService.deletePatientMedicalRecord('123'))
                .rejects.toThrow('Patient medical record not found.');
        });

        it('should return success message if patient record is deleted', async () => {
            PatientMedicalRecordRepository.deleteByRecordNumber.mockResolvedValue(true);
            const result = await PatientMedicalRecordService.deletePatientMedicalRecord('123');
            expect(result).toEqual({ message: 'Patient medical record deleted successfully', deletePatientMedicalRecord: true });
        });
    });

    describe('getAllPatientMedicalRecords', () => {
        it('should return all patient medical records', async () => {
            const mockRecords = [{}, {}];
            PatientMedicalRecordModel.find.mockResolvedValue(mockRecords);
            const result = await PatientMedicalRecordService.getAllPatientMedicalRecords();
            expect(result).toEqual(mockRecords);
        });
    });

    describe('getPatientMedicalRecordByRecordNumber', () => {
        it('should return the patient medical record by record number', async () => {
            const mockRecord = {};
            PatientMedicalRecordService.findByRecordNumber = jest.fn().mockResolvedValue(mockRecord);
            const result = await PatientMedicalRecordService.getPatientMedicalRecordByRecordNumber('123');
            expect(result).toEqual(mockRecord);
        });
    });

    describe('createMultiplePatientMedicalRecords', () => {
        it('should throw an error if records array is invalid', async () => {
            await expect(PatientMedicalRecordService.createMultiplePatientMedicalRecords(null))
                .rejects.toThrow('A list of records with recordNumber and fullName is required.');
        });

        it('should create multiple patient medical records and return created records and errors', async () => {
            const mockRecords = [
                { recordNumber: '123', fullName: 'John Doe' },
                { recordNumber: '124', fullName: 'Jane Doe' }
            ];
            PatientMedicalRecordRepository.findByRecordNumber.mockResolvedValue(null);
            PatientMedicalRecordModel.prototype.save = jest.fn().mockResolvedValue({});

            const result = await PatientMedicalRecordService.createMultiplePatientMedicalRecords(mockRecords);
            expect(result.createdRecords.length).toBe(2);
            expect(result.errors.length).toBe(0);
        });
    });
});