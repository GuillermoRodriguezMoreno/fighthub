import { apiEndpoint } from "@/config/api-endpoint";
import { PageResponse } from "@/domains/page-response";
import { EditUserRequest, NewUserRequest, UserResponse } from "@/domains/user";
import { fetchWithAuth } from "./utils";

export async function getUsers(): Promise<PageResponse<UserResponse>> {
  const res = await fetchWithAuth(apiEndpoint.users);
  return await res.json() ;
}

export async function getUser(id: number): Promise<UserResponse> {
  const res = await fetchWithAuth(`${apiEndpoint.users}/${id}`);
    return await res.json();
}

export async function newUser(user: NewUserRequest): Promise<Number> {
  const res = await fetchWithAuth(apiEndpoint.users, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return await res.json();
}

export async function editUser(id: number, user: EditUserRequest): Promise<UserResponse> {
  const res = await fetchWithAuth(`${apiEndpoint.users}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return await res.json();
}

export async function deleteUser(id: number): Promise<string> {
  const res = await fetchWithAuth(`${apiEndpoint.users}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await res.text();  
}