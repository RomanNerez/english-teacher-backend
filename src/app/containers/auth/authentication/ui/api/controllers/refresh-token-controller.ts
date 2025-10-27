import {Request, Response} from 'express';
import ParentApiController from '@ship/parents/controllers/api-controller';
import AppResponse from '@ship/core/http/response';
import RefreshTokenAction from '@containers/auth/authentication/actions/refresh-token-action';
import TokensTransformer from '@containers/auth/authentication/ui/api/transformers/tokens-transformer';
import { SESSION_LIFETIME_REMEMBER } from '@configs/session';

export default class RefreshTokenController extends ParentApiController {

    constructor(private action = new RefreshTokenAction()) {
        super();
    }

    async _invoke(req: Request, res: Response) {
        const result = await this.action.run(req.cookies.refresh_token);
        
        return AppResponse
            .init(res)
            .status(200)
            .setCookieKey('refresh_token', result.refreshToken, {
                maxAge:result.rememberMe ? SESSION_LIFETIME_REMEMBER : undefined
            })
            .create(result, new TokensTransformer());
    }
}