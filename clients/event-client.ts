import { apiEndpoint } from "@/config/api-endpoint";
import { defaultQueryParams } from "./types";
import { buildUrlWithQueryParams, fetchWithAuth } from "./utils";
import { PageResponse } from "@/domains/page-response";
import { EventRequest, EventResponse } from "@/domains/event";

export async function getEvents(
  queryParams: defaultQueryParams,
): Promise<PageResponse<EventResponse>> {
  const url = buildUrlWithQueryParams(apiEndpoint.events, queryParams);
  const res = await fetchWithAuth(url);
  return await res.json();
}

export async function getEvent(id: string): Promise<EventResponse> {
  const res = await fetchWithAuth(`${apiEndpoint.events}/${id}`);
  return await res.json();
}

export async function newEvent(eventRequest: EventRequest): Promise<Number> {
  const res = await fetchWithAuth(apiEndpoint.events, {
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

export async function getMyEvents(
  organizerEmail: string,
): Promise<PageResponse<EventResponse>> {
  const url = `${apiEndpoint.events}/organizer/${organizerEmail}`;
  const res = await fetchWithAuth(url);
  return await res.json();
}

export async function editEvent(
  eventId: number,
  eventRequest: EventRequest,
): Promise<EventResponse> {
  const res = await fetchWithAuth(`${apiEndpoint.events}/${eventId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventRequest),
  });
  if (!res.ok) {
    throw new Error("Failed to edit event");
  }
  return await res.json();
}

export async function deleteEvent(eventId: number): Promise<string> {
  const res = await fetchWithAuth(`${apiEndpoint.events}/${eventId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete event");
  }
  return res.text();
}

export async function uploadEventProfilePicture(
  file: File,
  eventId: string,
): Promise<EventResponse> {
  if (!file || !eventId) {
    throw new Error("File and eventId are required");
  }

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetchWithAuth(`${apiEndpoint.events}/${eventId}/upload-picture`, {
    method: "PATCH",
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Failed to upload picture: ${res.statusText}`);
  }

  return await res.json();
}
