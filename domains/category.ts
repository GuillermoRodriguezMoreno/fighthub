import { z } from "zod";
import { PageResponseSchema } from "./page-response";

export const CategorySchema = z.object({
    id: z.number().optional(),
    name: z.string(),
});

export type Category = z.infer<typeof CategorySchema>;
export const CategoryPageResponseSchema = PageResponseSchema(CategorySchema);
export type CategoryPageResponse = z.infer<typeof CategoryPageResponseSchema>;