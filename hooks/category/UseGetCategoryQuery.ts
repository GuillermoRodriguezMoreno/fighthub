import { getCategory } from "@/clients/CategoryClient";
import { useQuery } from "@tanstack/react-query";

export function UseGetCategoryQuery(categoryId: number) {
  return useQuery({queryKey: ["category"], queryFn: async () => getCategory(categoryId)});
}