import { z } from 'zod';
import FindUserByEmailTask from '@containers/main/user/tasks/find-user-by-email-task';

export default class CreateUserRequest {
  static schema = {
    body: z.object({
      first_name: z.string().nonempty().max(255),
      last_name: z.string().nonempty().max(255),
      email: z.email().max(255).refine(async (email) => {
        const task = new FindUserByEmailTask();
        const user = await task.run(email);

        return user === null;
      }, {
        message: 'User exist!',
      }),
      password: z.string().min(8),
      confirm_password: z.string().nonempty(),
    }).refine((data) => data.password === data.confirm_password, {
      message: 'Passwords don\'t match',
      path: ['confirm_password'],
    }),
  };
}