import { apiEndpoint } from "@/config/api-endpoint";
import { EventPageResponseSchema, EventSchema } from "@/domains/event";
import { defaultQueryParams } from "./types";
import { buildUrlWithQueryParams } from "./utils";

export async function getEvents(queryParams: defaultQueryParams) {
  const url = buildUrlWithQueryParams(apiEndpoint.events, queryParams);
  const res = await fetch(url);
  return EventPageResponseSchema.parse(await res.json());
}

export async function getEvent(id: number) {
  const res = await fetch(`${apiEndpoint.events}/${id}`);
    return EventSchema.parse(await res.json());
}