import { apiEndpoint } from "@/config/api-endpoint";
import { FightResponse } from "@/domains/fight";
import { PageResponse } from "@/domains/page-response";
import { fetchWithAuth } from "./utils";

export async function getFights(): Promise<PageResponse<FightResponse>> {
  const res = await fetchWithAuth(apiEndpoint.fights);
  return await res.json();
}

export async function getFight(id: number): Promise<FightResponse> {
  const res = await fetchWithAuth(`${apiEndpoint.fights}/${id}`);
  return await res.json();
}

export async function getFightsByEvent(
  eventId: string,
): Promise<PageResponse<FightResponse>> {
  const url = `${apiEndpoint.fights}/event/${eventId}`;
  const res = await fetchWithAuth(url);
  return await res.json();
}
