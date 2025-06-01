import { apiEndpoint } from "@/config/api-endpoint";
import { PageResponse } from "@/domains/page-response";
import { RoleResponse } from "@/domains/roles";
import { fetchWithAuth } from "./utils";

export async function getRoles(): Promise<PageResponse<RoleResponse>> {
  const res = await fetchWithAuth(apiEndpoint.roles);
    return await res.json();
}

export async function getRole(id: number): Promise<RoleResponse> {
  const res = await fetchWithAuth(`${apiEndpoint.roles}/${id}`);
    return await res.json();
}