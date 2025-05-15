import { FighterProfileResponse } from "@/domains/fighter-profile";
import { defaultQueryParams } from "./types";
import { buildUrlWithQueryParams } from "./utils";
import { apiEndpoint } from "@/config/api-endpoint";
import { PageResponse } from "@/domains/page-response";

export async function getFighterProfiles(queryParams: defaultQueryParams): Promise<PageResponse<FighterProfileResponse>> {
  const url = buildUrlWithQueryParams(apiEndpoint.fighters, queryParams);
  const res = await fetch(url);
    return await res.json();
}

export async function getFighterProfile(id: number): Promise<FighterProfileResponse> {
  const res = await fetch(`${apiEndpoint.fighters}/${id}`);
    return await res.json();
}