class FullName {
    constructor(firstName, lastName) {
        if (!firstName || !lastName) {
            throw new Error("Both firstName and lastName are required.");
        }
        this.value = `${firstName.trim()} ${lastName.trim()}`;
    }
}

module.exports = FullName;
