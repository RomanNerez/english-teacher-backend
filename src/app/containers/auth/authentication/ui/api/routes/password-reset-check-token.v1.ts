import {Request, Response} from 'express';
import PasswordResetRequest from '@containers/auth/authentication/ui/api/requests/password-reset-request';
import CheckPasswordResetController from '@containers/auth/authentication/ui/api/controllers/password/check-password-reset-controller';
import ValidateRequestMiddleware from '@ship/middlewares/validate-request-middleware';

const router = require('express').Router();
const validateMiddleware = new ValidateRequestMiddleware();
const middlewares = [
    validateMiddleware.handler(PasswordResetRequest.schema),
];
 
router.post('/password/reset/check-token', middlewares, (req: Request, res: Response) => {
    return new CheckPasswordResetController()._invoke(req, res);
});

module.exports = router;

