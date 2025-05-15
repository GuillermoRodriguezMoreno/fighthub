import { PageResponse } from "@/domains/page-response";
import { defaultQueryParams } from "./types";
import { buildUrlWithQueryParams } from "./utils";
import { apiEndpoint } from "@/config/api-endpoint";
import { ClubResponse } from "@/domains/club";

export async function getClubs(defaultQueryParams: defaultQueryParams): Promise<PageResponse<ClubResponse>> {
  const url = buildUrlWithQueryParams(apiEndpoint.clubs, defaultQueryParams);
  const res = await fetch(url);
    return await res.json();
}

export async function getClub(id: number): Promise<ClubResponse> {
  const res = await fetch(`${apiEndpoint.clubs}/${id}`);
    return await res.json();
}