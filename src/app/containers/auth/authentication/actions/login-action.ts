import LoginDTO from '@containers/auth/authentication/data/dtos/login-dto';
import TokensDTO from '@containers/auth/authentication/data/dtos/tokens-dto';
import AuthJwtPayloadDTO from '@containers/auth/authentication/data/dtos/auth-jwt-payload-dto';
import CheckUserCredentialsSubAction from '@containers/auth/authentication/actions/check-user-credentials-sub-action';
import ParentAction from '@ship/parents/actions/action';
import JWT from '@ship/core/supports/jwt';

export default class LoginAction extends ParentAction {

    constructor(private checkUserCredentialsSubAction = new CheckUserCredentialsSubAction()) {
        super();
    }

    async run(dto: LoginDTO) {
        const user = await this.checkUserCredentialsSubAction.run(dto);
        const authPayload = new AuthJwtPayloadDTO(user.id!, dto.remember);
        const {
            accessToken,
            refreshToken
        } = JWT.generateTokens(authPayload.toObj(), dto.remember);

        return new TokensDTO(accessToken, refreshToken, dto.remember);
    }
}
