import {Request, Response} from 'express';
import CreateUserController from '@containers/main/user/ui/api/controllers/create-user-controller';
import CreateUserRequest from '@containers/main/user/ui/api/requests/create-user-request';
import ApiAuthMiddleware from '@ship/middlewares/api-auth-middleware';
import ValidateRequestMiddleware from '@ship/middlewares/validate-request-middleware';

const router = require('express').Router();
const apiAuthMiddleware = new ApiAuthMiddleware();
const validateMiddleware = new ValidateRequestMiddleware();
const middlewares = [
    apiAuthMiddleware.handler(),
    validateMiddleware.handler(CreateUserRequest.schema)
];
 
router.post('/users', middlewares, (req: Request, res: Response) => {
    return new CreateUserController()._invoke(req, res);
});

module.exports = router;

