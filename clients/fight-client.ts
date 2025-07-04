import { apiEndpoint } from "@/config/api-endpoint";
import { FightRequest, FightResponse } from "@/domains/fight";
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

export async function getMyFights(
  fighterId: number,
): Promise<PageResponse<FightResponse>> {
  const url = `${apiEndpoint.fights}/fighter/${fighterId}`;
  const res = await fetchWithAuth(url);
  return await res.json();
}

export async function getFightsByEvent(
  eventId: string,
): Promise<PageResponse<FightResponse>> {
  const url = `${apiEndpoint.fights}/event/${eventId}`;
  const res = await fetchWithAuth(url);
  return await res.json();
}

export async function newFight(fight: FightRequest): Promise<FightResponse> {
  const res = await fetchWithAuth(apiEndpoint.fights, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fight),
  });
  return await res.json();
}

export async function editFight(
  fightId: number,
  fight: FightRequest,
): Promise<FightResponse> {
  const res = await fetchWithAuth(`${apiEndpoint.fights}/${fightId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fight),
  });
  return await res.json();
}

export async function deleteFight(id: number): Promise<string> {
  const res = await fetchWithAuth(`${apiEndpoint.fights}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await res.text();
}
