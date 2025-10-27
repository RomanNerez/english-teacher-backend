import LoginDTO from '@containers/auth/authentication/data/dtos/login-dto';
import TokensDTO from '@containers/auth/authentication/data/dtos/tokens-dto';
import CheckUserCredentialsSubAction from '@containers/auth/authentication/actions/check-user-credentials-sub-action';
import ParentAction from '@ship/parents/actions/action';
import JWT from '@ship/core/supports/jwt';

export default class LoginAction extends ParentAction {

    constructor(private checkUserCredentialsSubAction = new CheckUserCredentialsSubAction()) {
        super();
    }

    async run(dto: LoginDTO) {
        const user = await this.checkUserCredentialsSubAction.run(dto);

        const {
            accessToken,
            refreshToken
        } = JWT.generateTokens({ id: user.id }, dto.remember);

        return new TokensDTO(accessToken, refreshToken);
    }
}
