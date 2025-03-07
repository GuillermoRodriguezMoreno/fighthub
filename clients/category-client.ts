import { CategoryPageResponseSchema, CategorySchema } from "@/domains/category";

export async function getCategories() {
  const res = await fetch("http://localhost:8080/api/v1/categories");
    return CategoryPageResponseSchema.parse(await res.json());
}

export async function getCategory(id: number) {
  const res = await fetch(`http://localhost:8080/api/v1/categories/${id}`);
    return CategorySchema.parse(await res.json());
}