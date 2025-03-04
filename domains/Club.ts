import { z } from "zod";
import { PageResponseSchema } from "./PageResponse";

export const ClubSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
    address: z.string(),
    email: z.string().email(),
    description: z.string(),
    phone: z.string(),
    ownerId: z.number().optional(),
    ownerName: z.string(),
    ownerUsername: z.string(),
    ownerEmail: z.string().email(),
});

export type Club = z.infer<typeof ClubSchema>;
export const ClubPageResponseSchema = PageResponseSchema(ClubSchema);
export type ClubPageResponseSchema = z.infer<typeof ClubPageResponseSchema>;
