import { z } from 'zod';
import { PageResponseSchema } from './page-response';

export const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
  accountLocked: z.boolean().optional(),
  accountEnabled: z.boolean().optional(),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
  roles: z.array(z.string()),
});

export type User = z.infer<typeof UserSchema>;
export const UserPageResponseSchema = PageResponseSchema(UserSchema);
export type UserPageResponse = z.infer<typeof UserPageResponseSchema>;