import { z } from "zod";
import { StyleSchema } from "./style";
import { ClubSchema } from "./club";
import { CategorySchema } from "./category";
import { PageResponseSchema } from "./page-response";

export const FighterProfileSchema = z.object({
    id: z.number(),
    weight: z.number(),
    height: z.number(),
    gender: z.string(),
    biography: z.string(),
    userId: z.number().optional(),
    name: z.string(),
    username: z.string(),
    email: z.string().email(),
    dateOfBirth: z.string(),
    styles: z.array(StyleSchema),
    category: CategorySchema,
    club: ClubSchema,
});

export type FighterProfile = z.infer<typeof FighterProfileSchema>;
export const FighterProfilePageResponseSchema = PageResponseSchema(FighterProfileSchema);
export type FighterProfilePageResponse = z.infer<typeof FighterProfilePageResponseSchema>;