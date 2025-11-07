import {Request, Response} from 'express';
import PasswordResetAction from '@containers/auth/authentication/actions/password/password-reset-action';
import ApiController from '@ship/parents/controllers/api-controller';
import AppResponse from '@ship/core/http/response';
import PasswordResetDTO from '@containers/auth/authentication/data/dtos/password-reset-dto';

export default class CheckPasswordResetController extends ApiController {

    constructor(private action = new PasswordResetAction) {
        super();
    }

    async _invoke(req: Request, res: Response) {
        const dto = PasswordResetDTO.createFromRequest(req);
        await this.action.run(dto);

        return AppResponse
            .init(res)
            .noContent()
    }
}