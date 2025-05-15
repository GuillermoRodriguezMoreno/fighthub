import { apiEndpoint } from "@/config/api-endpoint";
import { defaultQueryParams } from "./types";
import { buildUrlWithQueryParams } from "./utils";
import { PageResponse } from "@/domains/page-response";
import { EventResponse } from "@/domains/event";

export async function getEvents(queryParams: defaultQueryParams): Promise<PageResponse<EventResponse>> {
  const url = buildUrlWithQueryParams(apiEndpoint.events, queryParams);
  const res = await fetch(url);
  return await res.json();
}

export async function getEvent(id: number): Promise<EventResponse> {
  const res = await fetch(`${apiEndpoint.events}/${id}`);
    return await res.json();
}