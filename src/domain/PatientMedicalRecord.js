class PatientMedicalRecord {
    constructor({
        recordNumber,
        allergies = [],
        medicalConditions = [],
        fullName = null,
    }) {
        if (!recordNumber) {
            throw new Error("PatientMedicalRecord requires recordNumber.");
        }

        if (!(recordNumber instanceof RecordNumber)) {
            throw new Error("Invalid RecordNumber.");
        }

        this.recordNumber = recordNumber;

        if (fullName && !(fullName instanceof FullName)) {
            throw new Error("Invalid FullName.");
        }
        this.fullName = fullName;

        this.allergies = allergies.map((allergy) => {
            if (!(allergy instanceof Allergy)) throw new Error("Invalid Allergy.");
            return allergy;
        });

        this.medicalConditions = medicalConditions.map((condition) => {
            if (!(condition instanceof MedicalCondition)) throw new Error("Invalid Medical Condition.");
            return condition;
        });
    }
}

module.exports = PatientMedicalRecord;
