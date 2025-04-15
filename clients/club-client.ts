import { ClubPageResponseSchema, ClubSchema } from "@/domains/club";
import { defaultQueryParams } from "./types";
import { buildUrlWithQueryParams } from "./utils";
import { apiEndpoint } from "@/config/api-endpoint";

export async function getClubs(defaultQueryParams: defaultQueryParams) {
  const url = buildUrlWithQueryParams(apiEndpoint.clubs, defaultQueryParams);
  const res = await fetch(url);
    return ClubPageResponseSchema.parse(await res.json());
}

export async function getClub(id: number) {
  const res = await fetch(`http://localhost:8080/api/v1/clubs/${id}`);
    return ClubSchema.parse(await res.json());
}