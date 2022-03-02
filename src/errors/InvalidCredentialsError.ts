export class InvalidCredentialsError extends  Error {
    constructor() {
        super("Credenciales de login inválidas");
    }
}