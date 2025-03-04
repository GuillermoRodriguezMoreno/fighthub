import { z } from 'zod';
import { PageResponseSchema } from './PageResponse';

export const UserSchema = z.object({
  id: z.number().optional(),
  firstname: z.string(),
  lastname: z.string(),
  username: z.string().nonempty(),
  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  email: z.string().email(),
  password: z.string().min(8).optional(),
  accountLocked: z.boolean(),
  accountEnabled: z.boolean(),
  fullName: z.string(),
  createdAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }).optional(),
  updatedAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }).optional(),
  roles: z.array(z.string()).optional(),
});

export type User = z.infer<typeof UserSchema>;
export const UserPageResponseSchema = PageResponseSchema(UserSchema);
export type UserPageResponse = z.infer<typeof UserPageResponseSchema>;