
const AllergyRepository = require('../../infrastructure/repositories/AllergyRepository');jest.mock('../../infrastructure/repositories/AllergyRepository');
const AllergyService = require('../AllergyService');

describe('AllergyService', () => {
    describe('createAllergy', () => {
        it('should create an allergy successfully', async () => {
            const req = {
                body: {
                    name: 'Pollen',
                    description: 'Allergy to pollen',
                    status: 'active'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await AllergyService.createAllergy(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Allergy created successfully.',
                allergy: req.body
            });
        });

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

            await AllergyService.createAllergy(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Name and description are required.' });
        });

    });

    describe('getAllAllergies', () => {
        it('should fetch all allergies successfully', async () => {
            const allergies = [{ name: 'Pollen', description: 'Allergy to pollen' }];
            AllergyRepository.getAllAllergies.mockResolvedValue(allergies);

            const result = await AllergyService.getAllAllergies();

            expect(result).toEqual(allergies);
        });

        it('should throw an error if there is an issue fetching allergies', async () => {
            AllergyRepository.getAllAllergies.mockRejectedValue(new Error('Error fetching allergies'));

            await expect(AllergyService.getAllAllergies()).rejects.toThrow('Error fetching allergies');
        });
    });

    describe('updateAllergy', () => {
        it('should update an allergy successfully', async () => {
            const data = { name: 'Pollen', description: 'Updated description' };
            const existingAllergy = { name: 'Pollen', description: 'Allergy to pollen', save: jest.fn().mockResolvedValue(data) };

            AllergyRepository.findByName.mockResolvedValue(existingAllergy);

            const result = await AllergyService.updateAllergy(data);

            expect(result).toEqual(data);
            expect(existingAllergy.save).toHaveBeenCalled();
        });

        it('should throw an error if no fields are provided to update', async () => {
            const data = {};

            await expect(AllergyService.updateAllergy(data)).rejects.toThrow('At least one field (name or description) is required to update.');
        });

        it('should throw an error if allergy is not found', async () => {
            const data = { name: 'Unknown' };

            AllergyRepository.findByName.mockResolvedValue(null);

            await expect(AllergyService.updateAllergy(data)).rejects.toThrow('Allergy not found.');
        });
    });

    describe('deleteAllergy', () => {
        it('should delete an allergy successfully', async () => {
            const name = 'Pollen';
            const deletedAllergy = { name: 'Pollen', description: 'Allergy to pollen' };

            AllergyRepository.deleteByName.mockResolvedValue(deletedAllergy);

            const result = await AllergyService.deleteAllergy(name);

            expect(result).toEqual(deletedAllergy);
        });

        it('should throw an error if name is not provided', async () => {
            await expect(AllergyService.deleteAllergy()).rejects.toThrow('Name is required to delete an allergy.');
        });

        it('should throw an error if allergy is not found', async () => {
            const name = 'Unknown';

            AllergyRepository.deleteByName.mockResolvedValue(null);

            await expect(AllergyService.deleteAllergy(name)).rejects.toThrow('Allergy not found.');
        });
    });
});