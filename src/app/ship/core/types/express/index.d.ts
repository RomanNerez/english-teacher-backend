import User from '@containers/main/user/models/user';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}