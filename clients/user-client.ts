import { apiEndpoint } from "@/config/api-endpoint";
import { PageResponse } from "@/domains/page-response";
import { UserResponse } from "@/domains/user";

export async function getUsers(): Promise<PageResponse<UserResponse>> {
  const res = await fetch(apiEndpoint.users);
  return await res.json() ;
}

export async function getUser(id: number): Promise<UserResponse> {
  const res = await fetch(`${apiEndpoint.users}/${id}`);
    return await res.json();
}