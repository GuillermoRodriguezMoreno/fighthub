import { z } from "zod";

export const PageResponseSchema = <T extends z.ZodTypeAny>(contentSchema: T) => z.object({
    content: z.array(contentSchema),
    number: z.number(),
    size: z.number(),
    totalElements: z.number(),
    totalPages: z.number(),
    first: z.boolean(),
    last: z.boolean(),
  });
  