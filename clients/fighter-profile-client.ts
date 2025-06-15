import { FighterProfileResponse } from "@/domains/fighter-profile";
import { defaultFightersQueryParams, defaultQueryParams } from "./types";
import { buildUrlWithQueryParams, fetchWithAuth } from "./utils";
import { apiEndpoint } from "@/config/api-endpoint";
import { PageResponse } from "@/domains/page-response";

export async function getFighterProfiles(
  queryParams: defaultQueryParams,
): Promise<PageResponse<FighterProfileResponse>> {
  const url = buildUrlWithQueryParams(apiEndpoint.fighters, queryParams);
  const res = await fetchWithAuth(url);
  return await res.json();
}

export async function getFighterProfile(
  id: number,
): Promise<FighterProfileResponse> {
  const res = await fetchWithAuth(`${apiEndpoint.fighters}/${id}`);
  return await res.json();
}

export async function getFighterProfilesByClub(
  clubId: number,
  queryParams: defaultQueryParams = defaultFightersQueryParams,
): Promise<PageResponse<FighterProfileResponse>> {
  const url = buildUrlWithQueryParams(
    `${apiEndpoint.fighters}/club/${clubId}`,
    queryParams,
  );
  const res = await fetchWithAuth(url);
  return await res.json();
}

export async function getMyFighters(
  userId: number,
  queryParams: defaultQueryParams = defaultFightersQueryParams,
): Promise<FighterProfileResponse[]> {
  const url = `${apiEndpoint.fighters}/my-fighters/${userId}`;
  const res = await fetchWithAuth(url);
  return await res.json();
}

export async function unsubscribeFighterFromClub(
  fighterId: number,
  clubId: number,
): Promise<FighterProfileResponse> {
  const res = await fetchWithAuth(
    `${apiEndpoint.fighters}/${fighterId}/unsubscribe-club/${clubId}`,
    {
      method: "DELETE",
    },
  );
  if (!res.ok) {
    throw new Error(
      `Error unsubscribing fighter ${fighterId} from club ${clubId}`,
    );
  }
  return await res.json();
}

export async function searchFighterByName(
  name: string,
): Promise<FighterProfileResponse[]> {
  const sanitizedName = name.trim().replace(/\s+/g, "");

  const res = await fetchWithAuth(
    `${apiEndpoint.fighters}/search?name=${encodeURIComponent(sanitizedName)}`,
  );
  return await res.json();
}

export async function uploadFighterProfilePicture(
  file: File,
  fighterId: string,
): Promise<FighterProfileResponse> {
  if (!file || !fighterId) {
    throw new Error("File and fighterId are required");
  }

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetchWithAuth(
    `${apiEndpoint.fighters}/${fighterId}/upload-picture`,
    {
      method: "PATCH",
      body: formData,
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to upload picture: ${res.statusText}`);
  }

  return await res.json();
}
