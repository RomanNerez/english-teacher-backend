import { z } from 'zod';
import FindUserByEmailTask from '@containers/main/user/tasks/find-user-by-email-task';

export default class PasswordForgotRequest {
  static schema = {
    body: z.object({
      email: z.email().max(255).refine(async (email) => {
        const task = new FindUserByEmailTask();
        const user = await task.run(email);

        return user !== null;
      }, {
        message: 'User was not found!',
      }),
    }),
  };
}