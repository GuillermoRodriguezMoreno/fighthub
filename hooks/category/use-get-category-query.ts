import { getCategory } from "@/clients/category-client";
import { useQuery } from "@tanstack/react-query";

export function UseGetCategoryQuery(categoryId: number) {
  return useQuery({
    queryKey: ["category"],
    queryFn: async () => getCategory(categoryId),
  });
}
