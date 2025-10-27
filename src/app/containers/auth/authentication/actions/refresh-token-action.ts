import TokensDTO from '@containers/auth/authentication/data/dtos/tokens-dto';
import AuthJwtPayloadDTO from '@containers/auth/authentication/data/dtos/auth-jwt-payload-dto';
import FindUserByIdTask from '@containers/main/user/tasks/find-user-by-id-task';
import CoreError from '@ship/core/errors/core-error';
import ParentAction from '@ship/parents/actions/action';
import JWT from '@ship/core/supports/jwt';

export default class RefreshTokenAction extends ParentAction {

    constructor(private task = new FindUserByIdTask()) {
        super();
    }

    async run(refreshToken: string): Promise<TokensDTO> {
        try {
            const payload = JWT.verifyRefreshToken(refreshToken);
            const authPayload = AuthJwtPayloadDTO.createFromJwtPayload(payload)
            await this.task.run(authPayload.userId);

            const {
                accessToken,
                refreshToken: newRefreshToken
            } = JWT.generateTokens(authPayload.toObj(), authPayload.rememberMe);

            return new TokensDTO(accessToken, newRefreshToken, authPayload.rememberMe);
        } catch (err) {
            console.log(err)
            throw new CoreError('Invalid refresh token', 401);
        }
    }
}