import { FighterProfilePageResponseSchema, FighterProfileSchema } from "@/domains/fighter-profile";
import { defaultQueryParams } from "./types";
import { buildUrlWithQueryParams } from "./utils";
import { apiEndpoint } from "@/config/api-endpoint";

export async function getFighterProfiles(queryParams: defaultQueryParams) {
  const url = buildUrlWithQueryParams(apiEndpoint.fighters, queryParams);
  const res = await fetch(url);
    return FighterProfilePageResponseSchema.parse(await res.json());
}

export async function getFighterProfile(id: number) {
  const res = await fetch(`${apiEndpoint.fighters}/${id}`);
    return FighterProfileSchema.parse(await res.json());
}