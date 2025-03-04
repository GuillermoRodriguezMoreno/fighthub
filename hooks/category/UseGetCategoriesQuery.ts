import { getCategories } from "@/clients/CategoryClient";
import { useQuery } from "@tanstack/react-query";

export function UseGetCategoriesQuery() {
  return useQuery({queryKey: ["categories"], queryFn: async () => getCategories()});
}