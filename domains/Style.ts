import { z } from "zod";
import { PageResponseSchema } from "./PageResponse";

export const StyleSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
});

export type Style = z.infer<typeof StyleSchema>;
export const StylePageResponseSchema = PageResponseSchema(StyleSchema);
export type StylePageResponse = z.infer<typeof StylePageResponseSchema>;