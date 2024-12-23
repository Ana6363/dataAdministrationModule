class Allergy {
    constructor(name, description) {
        if (!name || typeof name !== 'string') {
            throw new Error("Allergy requires a valid name.");
        }
        if (!description || typeof description !== 'string') {
            throw new Error("Allergy requires a valid description.");
        }

        this.name = name;
        this.description = description;
    }
}

module.exports = Allergy;
