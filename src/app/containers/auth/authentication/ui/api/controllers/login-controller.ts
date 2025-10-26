import {Request, Response} from 'express';
import ParentApiController from '@ship/parents/controllers/api-controller';
import LoginAction from '@containers/auth/authentication/actions/login-action';
import LoginDTO from '@containers/auth/authentication/data/dtos/login-dto';
import AppResponse from '@ship/core/http/response';
import TokensTransformer from '@containers/auth/authentication/ui/api/transformers/tokens-transformer';

export default class LoginController extends ParentApiController {

    private action: LoginAction;

    constructor() {
        super();
        
        this.action = new LoginAction();
    }

    async _invoke(req: Request, res: Response) {
        const dto = LoginDTO.createFromRequest(req);
        const result = await this.action.run(dto);

        return AppResponse
            .init(res)
            .status(200)
            .create(result, new TokensTransformer);
    }
}
