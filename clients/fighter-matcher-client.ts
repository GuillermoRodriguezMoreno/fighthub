import { apiEndpoint } from "@/config/api-endpoint";
import { fetchWithAuth } from "./utils";
import { FighterProfileResponse } from "@/domains/fighter-profile";

export async function getFighterMatcher(
  fighterId: number,
): Promise<FighterProfileResponse[]> {
  const url = `${apiEndpoint.fighterMatcher}/${fighterId}`;
  const res = await fetchWithAuth(url);
  return await res.json();
}
