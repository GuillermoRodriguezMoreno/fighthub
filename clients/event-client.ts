import { apiEndpoint } from "@/config/api-endpoint";
import { defaultQueryParams } from "./types";
import { buildUrlWithQueryParams } from "./utils";
import { PageResponse } from "@/domains/page-response";
import { EventRequest, EventResponse } from "@/domains/event";

export async function getEvents(queryParams: defaultQueryParams): Promise<PageResponse<EventResponse>> {
  const url = buildUrlWithQueryParams(apiEndpoint.events, queryParams);
  const res = await fetch(url);
  return await res.json();
}

export async function getEvent(id: number): Promise<EventResponse> {
  const res = await fetch(`${apiEndpoint.events}/${id}`);
    return await res.json();
}

export async function newEvent(eventRequest: EventRequest): Promise<Number> {
  const res = await fetch(apiEndpoint.events, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventRequest),
  });
  if (!res.ok) {
    throw new Error("Failed to create event");
  }
  return await res.json();
}