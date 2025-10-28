import {Request, Response} from 'express';
import PasswordForgotController from '@containers/auth/authentication/ui/api/controllers/password/password-forgot-controller';
import PasswordForgotRequest from '@containers/auth/authentication/ui/api/requests/password-forgot-request';
import ValidateRequestMiddleware from '@ship/middlewares/validate-request-middleware';

const router = require('express').Router();
const validateMiddleware = new ValidateRequestMiddleware();
const middlewares = [
    validateMiddleware.handler(PasswordForgotRequest.schema),
];
 
router.post('/password/forgot', middlewares, (req: Request, res: Response) => {
    return new PasswordForgotController()._invoke(req, res);
});

module.exports = router;

