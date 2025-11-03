import {Request, Response} from 'express';
import ApiAuthMiddleware from '@ship/middlewares/api-auth-middleware';
import MeUserController from '@containers/auth/authentication/ui/api/controllers/me-controller';

const router = require('express').Router();
const apiAuthMiddleware = new ApiAuthMiddleware();
const middlewares = [
    apiAuthMiddleware.handler(),
];
 
router.get('/me', middlewares, (req: Request, res: Response) => {
    return new MeUserController()._invoke(req, res);
});

module.exports = router;

