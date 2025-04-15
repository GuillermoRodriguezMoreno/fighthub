import { defaultQueryParams } from "./types";

export function buildUrlWithQueryParams(baseUrl: string, queryParams: defaultQueryParams): string {
    const url = new URL(baseUrl);
    Object.entries(queryParams || {}).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            url.searchParams.append(key, String(value));
        }
    });
    return url.toString();
}