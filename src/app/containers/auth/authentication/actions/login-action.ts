import LoginDTO from '@containers/auth/authentication/data/dtos/login-dto';

export default class LoginAction {

    constructor() {

    }

    run(dto: LoginDTO) {
        return {
            access_token: 'test',
            refresh_token: 'test',
        }
    }
}
