const MedicalConditionsService = require('../MedicalConditionsService');
const MedicalConditionsRepository = require('../../infrastructure/repositories/MedicalConditionsRepository');
jest.mock('../../infrastructure/repositories/MedicalConditionsRepository');

describe('MedicalConditionsService', () => {
    describe('createMedicalCondition', () => {
        it('should return 400 if name or description is missing', async () => {
            const req = {
                body: {
                    name: '',
                    description: ''
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            await MedicalConditionsService.createMedicalCondition(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Name and description are required.' });
        });

        it('should create medical condition', async () => {
            const req = {
                body: { name: 'Condition1', description: 'Description1' }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            await MedicalConditionsService.createMedicalCondition(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Medical condition created successfully.',
                medicalCondition: req.body
            });
        });

       
    });

    describe('getAllMedicalConditions', () => {
        it('should return all medical conditions', async () => {
            const mockConditions = [{ name: 'Condition1', description: 'Description1' }];
            MedicalConditionsRepository.getAllMedicalConditions.mockResolvedValue(mockConditions);
            const result = await MedicalConditionsService.getAllMedicalConditions();
            expect(result).toEqual(mockConditions);
        });

        it('should throw an error if there is an issue fetching conditions', async () => {
            MedicalConditionsRepository.getAllMedicalConditions.mockRejectedValue(new Error('Test error'));
            await expect(MedicalConditionsService.getAllMedicalConditions()).rejects.toThrow('Test error');
        });
    });

    describe('updateMedicalCondition', () => {
        it('should throw an error if no fields are provided', async () => {
            await expect(MedicalConditionsService.updateMedicalCondition({})).rejects.toThrow('At least one field (name or description) is required to update.');
        });

        it('should throw an error if medical condition is not found', async () => {
            MedicalConditionsRepository.findByName.mockResolvedValue(null);
            await expect(MedicalConditionsService.updateMedicalCondition({ name: 'Condition1' })).rejects.toThrow('Medical condition not found.');
        });

        it('should update and return the medical condition', async () => {
            const mockCondition = { name: 'Condition1', description: 'Description1', save: jest.fn().mockResolvedValue({ name: 'Condition1', description: 'Updated Description' }) };
            MedicalConditionsRepository.findByName.mockResolvedValue(mockCondition);
            const result = await MedicalConditionsService.updateMedicalCondition({ name: 'Condition1', description: 'Updated Description' });
            expect(result).toEqual({ name: 'Condition1', description: 'Updated Description' });
        });
    });

    describe('deleteMedicalCondition', () => {
        it('should throw an error if name is not provided', async () => {
            await expect(MedicalConditionsService.deleteMedicalCondition()).rejects.toThrow('Name is required to delete a medical condition.');
        });

        it('should delete and return the medical condition', async () => {
            const mockCondition = { name: 'Condition1', description: 'Description1' };
            MedicalConditionsRepository.deleteByName.mockResolvedValue(mockCondition);
            const result = await MedicalConditionsService.deleteMedicalCondition('Condition1');
            expect(result).toEqual({ message: 'Medical condition deleted successfully.', deletedMedicalCondition: mockCondition });
        });
    });
});