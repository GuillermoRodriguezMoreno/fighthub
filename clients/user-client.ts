import { apiEndpoint } from "@/config/api-endpoint";
import { PageResponse } from "@/domains/page-response";
import { EditUserRequest, UserResponse } from "@/domains/user";

export async function getUsers(): Promise<PageResponse<UserResponse>> {
  const res = await fetch(apiEndpoint.users);
  return await res.json() ;
}

export async function getUser(id: number): Promise<UserResponse> {
  const res = await fetch(`${apiEndpoint.users}/${id}`);
    return await res.json();
}

export async function editUser(id: number, user: EditUserRequest): Promise<UserResponse> {
  const res = await fetch(`${apiEndpoint.users}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return await res.json();
}

export async function deleteUser(id: number): Promise<void> {
  const res = await fetch(`${apiEndpoint.users}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to delete user");
  }
  else {
    return await res.json();
  }
}