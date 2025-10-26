import {Request, Response} from 'express';
import ParentApiController from '@ship/parents/controllers/api-controller';
import CreateUserAction from '@containers/main/user/actions/create-user-action';
import CreateUserDTO from '@containers/main/user/data/dtos/create-user-dto';
import AppResponse from '@ship/core/http/response';
import UserTransformer from '@containers/main/user/ui/api/transformers/user-transformer';

export default class CreateUserController extends ParentApiController{

    constructor(private action = new CreateUserAction()) {
        super();
    }

    async _invoke(req: Request, res: Response) {
        const result = await this.action.run(CreateUserDTO.createFromRequest(req));

        return AppResponse
            .init(res)
            .status(201)
            .create(result, new UserTransformer);
    }
}
