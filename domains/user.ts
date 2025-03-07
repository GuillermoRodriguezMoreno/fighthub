import { z } from 'zod';
import { PageResponseSchema } from './page-response';

export const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
  isAccountLocked: z.boolean().optional(),
  isAccountEnabled: z.boolean().optional(),
  roles: z.array(z.string()),
});

export type User = z.infer<typeof UserSchema>;
export const UserPageResponseSchema = PageResponseSchema(UserSchema);
export type UserPageResponse = z.infer<typeof UserPageResponseSchema>;