import { getCategories } from "@/clients/category-client";
import { useQuery } from "@tanstack/react-query";

export function UseGetCategoriesQuery() {
  return useQuery({queryKey: ["categories"], queryFn: async () => getCategories()});
}