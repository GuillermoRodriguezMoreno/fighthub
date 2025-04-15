import { z } from "zod";
import { PageResponseSchema } from "./page-response";

export const EventSchema = z.object({
    id: z.number(), 
    name: z.string(),
    description: z.string(),
    address: z.string(),
    startDate: z.string(), 
    endDate: z.string(),   
    organizerId: z.number(),
    organizerName: z.string(),
    organizerAddress: z.string(),
    organizerEmail: z.string(),
    organizerPhone: z.string(),
});

export type Event = z.infer<typeof EventSchema>;
export const EventPageResponseSchema = PageResponseSchema(EventSchema);
export type EventPageResponse = z.infer<typeof EventPageResponseSchema>;
