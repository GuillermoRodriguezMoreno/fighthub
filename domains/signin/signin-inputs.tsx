import { z } from 'zod';

export const signinInputsSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export type SigninInputs = z.infer<typeof signinInputsSchema>;