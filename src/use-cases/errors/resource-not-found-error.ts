export class UserAlreadyExistsError extends Error {
    constructor() {
        super("Resource not found.");
    }
}
