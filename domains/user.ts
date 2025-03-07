import { z } from 'zod';
import { PageResponseSchema } from './page-response';

export const UserSchema = z.object({
  id: z.number().optional(),
  username: z.string().nonempty(),
  email: z.string().email(),
  isAccountLocked: z.boolean(),
  isAccountEnabled: z.boolean(),
  roles: z.array(z.string()).optional(),
});

export type User = z.infer<typeof UserSchema>;
export const UserPageResponseSchema = PageResponseSchema(UserSchema);
export type UserPageResponse = z.infer<typeof UserPageResponseSchema>;