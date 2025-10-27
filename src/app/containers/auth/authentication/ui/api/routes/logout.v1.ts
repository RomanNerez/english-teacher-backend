import {Request, Response} from 'express';
import LogoutController from '@containers/auth/authentication/ui/api/controllers/logout-controller';
import ApiAuthMiddleware from '@ship/middlewares/api-auth-middleware';

const router = require('express').Router();
const apiAuthMiddleware = new ApiAuthMiddleware();
const middlewares = [
    apiAuthMiddleware.handler(),
];
 
router.post('/logout', middlewares, (req: Request, res: Response) => {
    return new LogoutController()._invoke(req, res);
});

module.exports = router;

