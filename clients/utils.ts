import { defaultQueryParams } from "./types";

import { getSession } from "next-auth/react";

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const session = await getSession();
  const token = session?.accessToken;

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  return fetch(url, { ...options, headers });
}

export function buildUrlWithQueryParams(
  baseUrl: string,
  queryParams: defaultQueryParams,
): string {
  const url = new URL(baseUrl);
  Object.entries(queryParams || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value));
    }
  });
  return url.toString();
}
