import { PageResponse } from "@/domains/page-response";
import { defaultQueryParams } from "./types";
import { buildUrlWithQueryParams, fetchWithAuth } from "./utils";
import { apiEndpoint } from "@/config/api-endpoint";
import { ClubResponse } from "@/domains/club";

export async function getClubs(
  defaultQueryParams: defaultQueryParams,
): Promise<PageResponse<ClubResponse>> {
  const url = buildUrlWithQueryParams(apiEndpoint.clubs, defaultQueryParams);
  const res = await fetchWithAuth(url);
  return await res.json();
}

export async function getClub(id: number): Promise<ClubResponse> {
  const res = await fetchWithAuth(`${apiEndpoint.clubs}/${id}`);
  return await res.json();
}

export async function getMyClubs(ownerEmail: string): Promise<ClubResponse[]> {
  const url = `${apiEndpoint.clubs}/owner/${ownerEmail}`;
  const res = await fetchWithAuth(url);
  if (!res.ok) {
    throw new Error(
      `Error fetching clubs for owner ${ownerEmail}: ${res.statusText}`,
    );
  }
  return await res.json();
}
