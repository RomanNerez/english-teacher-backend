import { z } from 'zod';
import FindUserByEmailTask from '@containers/main/user/tasks/find-user-by-email-task';

export default class PasswordResetRequest {
  static schema = {
    body: z.object({
      email: z.email().max(255).refine(async (email) => {
        const task = new FindUserByEmailTask();
        const user = await task.run(email);

        return user !== null;
      }, {
        message: 'User was not found!',
      }),
      password: z.string().min(8),
      confirm_password: z.string().nonempty(),
    }).refine((data) => data.password === data.confirm_password, {
      message: 'Passwords don\'t match',
      path: ['confirm_password'],
    }),
    params: z.object({
      token: z.string().nonempty()
    })
  };
}