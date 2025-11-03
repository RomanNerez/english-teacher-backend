import {Request, Response} from 'express';
import CreateUserDTO from '@containers/main/user/data/dtos/create-user-dto';
import UserTransformer from '@containers/main/user/ui/api/transformers/user-transformer';
import CreateUserAction from '@containers/main/user/actions/create-user-action';
import ParentApiController from '@ship/parents/controllers/api-controller';
import AppResponse from '@ship/core/http/response';

export default class RegisterController extends ParentApiController {

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
