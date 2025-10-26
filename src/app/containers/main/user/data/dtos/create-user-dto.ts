import { Request } from "express";

export default class CreateUserDTO {

    constructor(
        public first_name: string,
        public last_name: string,
        public email: string,
        public password: string,
    ) {
    }

    static createFromRequest(req: Request): CreateUserDTO {
        const { first_name, last_name, email, password } = req.body;

        return new CreateUserDTO(
            first_name,
            last_name,
            email,
            password,
        );
    }
}