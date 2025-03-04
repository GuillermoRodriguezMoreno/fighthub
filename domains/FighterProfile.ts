import { z } from "zod";
import { Style } from "@mui/icons-material";
import { StyleSchema } from "./Style";
import { ClubSchema } from "./Club";
import { CategorySchema } from "./Category";
import { PageResponseSchema } from "./PageResponse";

export const FighterProfileSchema = z.object({
    id: z.number().optional(),
    weight: z.number(),
    height: z.number(),
    gender: z.string(),
    biography: z.string(),
    userId: z.number().optional(),
    name: z.string(),
    username: z.string(),
    email: z.string().email(),
    dateOfBirth: z.string(), // Assuming date is in ISO string format
    styles: z.array(StyleSchema),
    category: CategorySchema,
    club: ClubSchema,
});

export type FighterProfile = z.infer<typeof FighterProfileSchema>;
export const FighterProfilePageResponseSchema = PageResponseSchema(FighterProfileSchema);
export type FighterProfilePageResponse = z.infer<typeof FighterProfilePageResponseSchema>;