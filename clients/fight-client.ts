import { apiEndpoint } from "@/config/api-endpoint";
import { FightResponse } from "@/domains/fight";
import { PageResponse } from "@/domains/page-response";

export async function getFights(): Promise<PageResponse<FightResponse>> {
  const res = await fetch(apiEndpoint.fights);
    return await res.json();
}

export async function getFight(id: number): Promise<FightResponse> {
  const res = await fetch(`${apiEndpoint.fights}/${id}`);
    return await res.json();
}