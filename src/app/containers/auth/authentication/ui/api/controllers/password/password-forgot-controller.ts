import {Request, Response} from 'express';
import ForgotPasswordAction from '@containers/auth/authentication/actions/password/password-forgot-action';
import ApiController from '@ship/parents/controllers/api-controller';
import AppResponse from '@ship/core/http/response';

export default class PasswordForgotController extends ApiController {

    constructor(private action = new ForgotPasswordAction) {
        super();
    }

    async _invoke(req: Request, res: Response) {
        await this.action.run(req.body.email);

        return AppResponse
            .init(res)
            .noContent()
    }
}