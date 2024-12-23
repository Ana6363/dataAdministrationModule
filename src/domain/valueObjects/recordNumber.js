class RecordNumber {
    constructor(value) {
        if (!/^[0-9]+$/.test(value)) {
            throw new Error("RecordNumber must be numeric.");
        }
        this.value = value;
    }
}

module.exports = RecordNumber;
