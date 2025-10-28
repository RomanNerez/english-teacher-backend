import {Request, Response} from 'express';
import ValidateRequestMiddleware from '@ship/middlewares/validate-request-middleware';
import PasswordResetController from '@containers/auth/authentication/ui/api/controllers/password/password-reset-controller';
import PasswordResetRequest from '@containers/auth/authentication/ui/api/requests/password-reset-request';

const router = require('express').Router();
const validateMiddleware = new ValidateRequestMiddleware();
const middlewares = [
    validateMiddleware.handler(PasswordResetRequest.schema),
];
 
router.post('/password/reset/:token', middlewares, (req: Request, res: Response) => {
    return new PasswordResetController()._invoke(req, res);
});

module.exports = router;

