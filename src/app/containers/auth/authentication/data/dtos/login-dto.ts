import { Request } from 'express';

export default class LoginDTO {

    constructor(
        public email: string,
        public password: string,
    ) {
    }

    static createFromRequest(req: Request): LoginDTO {
        const { email, password } = req.body;

        return new LoginDTO(email, password);
    }
}