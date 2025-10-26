import {Request, Response} from 'express';
import ValidateRequestMiddleware from '@ship/middlewares/validate-request-middleware';
import LoginController from '@containers/auth/authentication/ui/api/controllers/login-controller';
import LoginRequest from '@containers/auth/authentication/ui/api/requests/login-request';

const router = require('express').Router();
const validateMiddleware = new ValidateRequestMiddleware();
 
router.post('/login', validateMiddleware.handler(LoginRequest.schema), (req: Request, res: Response) => {
    return new LoginController()._invoke(req, res);
});

module.exports = router;

