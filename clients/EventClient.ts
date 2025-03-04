import { EventPageResponseSchema, EventSchema } from "@/domains/Event";

export async function getEvents() {
  const res = await fetch("http://localhost:8080/api/v1/events");
    return EventPageResponseSchema.parse(await res.json());
}

export async function getEvent(id: number) {
  const res = await fetch(`http://localhost:8080/api/v1/events/${id}`);
    return EventSchema.parse(await res.json());
}