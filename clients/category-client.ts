import { apiEndpoint } from "@/config/api-endpoint";
import { CategoryResponse } from "@/domains/category";
import { PageResponse } from "@/domains/page-response";

export async function getCategories(): Promise<PageResponse<CategoryResponse>> {
  const res = await fetch(`${apiEndpoint.categories}`);
    return await res.json();
}

export async function getCategory(id: number): Promise<CategoryResponse> {
  const res = await fetch(`${apiEndpoint.categories}/${id}`);
    return await res.json();
}