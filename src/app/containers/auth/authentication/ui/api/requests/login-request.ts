import { z } from 'zod';

export default class LoginRequest {
  static schema = {
    body: z.object({
      email: z.email(),
      password: z.string().nonempty(),
      remember: z.boolean(),
    }),
  };
}