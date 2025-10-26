import {Request, Response} from 'express';
import ValidateRequestMiddleware from '@ship/middlewares/validate-request-middleware';
import CreateUserController from '@containers/main/user/ui/api/controllers/create-user-controller';
import CreateUserRequest from '@containers/main/user/ui/api/requests/create-user-request';

const router = require('express').Router();
const validateMiddleware = new ValidateRequestMiddleware();
 
router.post('/users', validateMiddleware.handler(CreateUserRequest.schema), (req: Request, res: Response) => {
    return new CreateUserController()._invoke(req, res);
});

module.exports = router;

