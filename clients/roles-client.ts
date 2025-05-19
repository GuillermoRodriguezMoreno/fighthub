import { apiEndpoint } from "@/config/api-endpoint";
import { PageResponse } from "@/domains/page-response";
import { RoleResponse } from "@/domains/roles";

export async function getRoles(): Promise<PageResponse<RoleResponse>> {
  const res = await fetch(apiEndpoint.roles);
    return await res.json();
}

export async function getRole(id: number): Promise<RoleResponse> {
  const res = await fetch(`${apiEndpoint.roles}/${id}`);
    return await res.json();
}