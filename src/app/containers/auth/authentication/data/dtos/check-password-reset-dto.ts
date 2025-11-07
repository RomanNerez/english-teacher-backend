import { Request } from 'express';

export default class PasswordResetDTO {

    constructor(
        public email: string,
        public token: string,
    ) {
    }

    static createFromRequest(req: Request): PasswordResetDTO {
        const { email } = req.query;
        const { token } = req.params

        return new PasswordResetDTO(email, token);
    }
}