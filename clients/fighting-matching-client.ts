import { apiEndpoint } from "@/config/api-endpoint";
import { OpponnetRank } from "@/domains/fighting-matching";
import { fetchWithAuth } from "./utils";

export async function getFightingMatching(
  fighterId: number,
): Promise<OpponnetRank[]> {
  const url = `${apiEndpoint.fighterMatching}/${fighterId}`;
  const res = await fetchWithAuth(url);
  return await res.json();
}
