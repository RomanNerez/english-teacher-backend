import {Request, Response} from 'express';
import ParentApiController from '@ship/parents/controllers/api-controller';
import AppResponse from '@ship/core/http/response';
import UserTransformer from '@containers/main/user/ui/api/transformers/user-transformer';

export default class MeUserController extends ParentApiController {

    async _invoke(req: Request, res: Response) {

        return AppResponse
            .init(res)
            .create(req.user, new UserTransformer);
    }
}
