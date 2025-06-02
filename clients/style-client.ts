import { apiEndpoint } from "@/config/api-endpoint";
import { PageResponse } from "@/domains/page-response";
import { StyleResponse } from "@/domains/style";
import { fetchWithAuth } from "./utils";

export async function getStyles(): Promise<PageResponse<StyleResponse>> {
  const res = await fetchWithAuth(apiEndpoint.styles);
  return await res.json();
}

export async function getStyle(id: number): Promise<StyleResponse> {
  const res = await fetchWithAuth(`${apiEndpoint.styles}/${id}`);
  return await res.json();
}
