import { z } from 'zod';

export const signupInputsSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string()
});

export type SignupInputs = z.infer<typeof signupInputsSchema>;