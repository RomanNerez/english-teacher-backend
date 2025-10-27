import {Request, Response} from 'express';
import AppResponse from '@ship/core/http/response';
import ApiController from '@ship/parents/controllers/api-controller';

export default class LogoutController extends ApiController {

    async _invoke(req: Request, res: Response) {
        return AppResponse
            .init(res)
            .clearCookie('refresh_token')
            .noContent();
    }
}