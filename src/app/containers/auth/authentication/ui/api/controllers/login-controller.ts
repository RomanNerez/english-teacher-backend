import {Request, Response} from 'express';
import ParentApiController from '@ship/parents/controllers/api-controller';
import LoginAction from '@containers/auth/authentication/actions/login-action';
import LoginDTO from '@containers/auth/authentication/data/dtos/login-dto';
import AppResponse from '@ship/core/http/response';
import TokensTransformer from '@containers/auth/authentication/ui/api/transformers/tokens-transformer';
import { SESSION_LIFETIME_REMEMBER } from '@configs/session';

export default class LoginController extends ParentApiController {

    constructor(private action = new LoginAction()) {
        super();
    }

    async _invoke(req: Request, res: Response) {
        const dto = LoginDTO.createFromRequest(req);
        const result = await this.action.run(dto);

        return AppResponse
            .init(res)
            .status(200)
            .setCookieKey('refresh_token', result.refreshToken, {
                maxAge: dto.remember ? SESSION_LIFETIME_REMEMBER : undefined
            })
            .create(result, new TokensTransformer);
    }
}
