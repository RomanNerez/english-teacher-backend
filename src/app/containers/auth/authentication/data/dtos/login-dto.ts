import { Request } from 'express';

export default class LoginDTO {

    constructor(
        public email: string,
        public password: string,
        public remember: boolean,
    ) {
    }

    static createFromRequest(req: Request): LoginDTO {
        const { email, password, remember } = req.body;

        return new LoginDTO(email, password, remember);
    }
}