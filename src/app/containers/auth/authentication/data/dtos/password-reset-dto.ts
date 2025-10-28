import { Request } from 'express';

export default class PasswordResetDTO {

    constructor(
        public email: string,
        public password: string,
        public token: string,
    ) {
    }

    static createFromRequest(req: Request): PasswordResetDTO {
        const { email, password } = req.body;
        const { token } = req.params

        return new PasswordResetDTO(email, password, token);
    }
}