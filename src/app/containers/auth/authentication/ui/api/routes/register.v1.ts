import { Request, Response } from 'express';
import RegisterRequest from '@containers/auth/authentication/ui/api/requests/register-request';
import RegisterController from '@containers/auth/authentication/ui/api/controllers/register-controller';
import ValidateRequestMiddleware from '@ship/middlewares/validate-request-middleware';

const router = require('express').Router();
const validateMiddleware = new ValidateRequestMiddleware();
 
router.post('/register', validateMiddleware.handler(RegisterRequest.schema), (req: Request, res: Response) => {
    return new RegisterController()._invoke(req, res);
});

module.exports = router;

