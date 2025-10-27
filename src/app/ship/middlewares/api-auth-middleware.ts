import type { Request, Response, NextFunction } from 'express';
import FindUserByIdTask from '@containers/main/user/tasks/find-user-by-id-task';
import AuthJwtPayloadDTO from '@containers/auth/authentication/data/dtos/auth-jwt-payload-dto';
import CoreError from '@ship/core/errors/core-error';
import AbstractMiddleware from '@ship/core/middlewares/middleware';
import JWT from '@ship/core/supports/jwt';

export default class ApiAuthMiddleware extends AbstractMiddleware {
    handler() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const authHeader = req.headers['authorization'];
                const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

                if (!token) throw new Error('Access token missing');

                const payload = JWT.verifyAccessToken(token);
                const authData = AuthJwtPayloadDTO.createFromJwtPayload(payload);
                const task = new FindUserByIdTask();
                const user = await task.run(authData.userId);

                if (!user) throw new Error('User was not found');
                
                req.user = user; 

                next();
            } catch (error) {
                console.log(error);
                throw new CoreError('Unauthorized', 401);
            }
        }
    }
}