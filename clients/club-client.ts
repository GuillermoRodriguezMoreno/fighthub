import { PageResponse } from "@/domains/page-response";
import { defaultQueryParams } from "./types";
import { buildUrlWithQueryParams, fetchWithAuth } from "./utils";
import { apiEndpoint } from "@/config/api-endpoint";
import { ClubRequest, ClubResponse } from "@/domains/club";
import { AddFighterToClubRequest } from "@/domains/fighter-profile";

export async function getClubs(
  defaultQueryParams: defaultQueryParams,
): Promise<PageResponse<ClubResponse>> {
  const url = buildUrlWithQueryParams(apiEndpoint.clubs, defaultQueryParams);
  const res = await fetchWithAuth(url);
  return await res.json();
}

export async function getClub(id: string): Promise<ClubResponse> {
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

export async function newClub(club: ClubRequest): Promise<ClubResponse> {
  const res = await fetchWithAuth(apiEndpoint.clubs, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(club),
  });
  return await res.json();
}

export async function editClub(
  clubId: number,
  club: ClubRequest,
): Promise<ClubResponse> {
  const res = await fetchWithAuth(`${apiEndpoint.clubs}/${clubId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(club),
  });
  return await res.json();
}

export async function deleteClub(clubId: number): Promise<string> {
  const res = await fetchWithAuth(`${apiEndpoint.clubs}/${clubId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete club");
  }
  return res.text();
}

export async function joinClub(
  clubId: number,
  fighterId: number,
): Promise<String> {
  const res = await fetchWithAuth(`${apiEndpoint.clubs}/${clubId}/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fighterId),
  });
  if (!res.ok) {
    throw new Error(`Failed to join club: ${res.statusText}`);
  }
  return await res.text();
}

export async function uploadClubProfilePicture(
  file: File,
  clubId: string,
): Promise<ClubResponse> {
  if (!file || !clubId) {
    throw new Error("File and clubId are required");
  }

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetchWithAuth(
    `${apiEndpoint.clubs}/${clubId}/upload-picture`,
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
