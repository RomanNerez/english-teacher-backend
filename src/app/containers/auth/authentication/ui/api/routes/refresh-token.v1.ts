import {Request, Response} from 'express';
import RefreshTokenController from '@containers/auth/authentication/ui/api/controllers/refresh-token-controller';

const router = require('express').Router();
 
router.post('/refresh-token', (req: Request, res: Response) => {
    return new RefreshTokenController()._invoke(req, res);
});

module.exports = router;

