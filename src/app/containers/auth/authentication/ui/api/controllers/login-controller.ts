import {Request, Response} from 'express';
import ParentApiController from '@ship/parents/controllers/api-controller';
import LoginAction from '@containers/auth/authentication/actions/login-action';
import LoginDTO from '@containers/auth/authentication/data/dtos/login-dto';

export default class LoginController extends ParentApiController {

    private action: LoginAction;

    constructor() {
        super();
        
        this.action = new LoginAction();
    }

    _invoke(req: Request, res: Response) {
        const dto = new LoginDTO(req.body.email, req.body.password);
        const result = this.action.run(dto);

        return res.status(200).json(result);
    }
}
