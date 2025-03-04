import { getStyles } from "@/clients/StyleClient";
import { useQuery } from "@tanstack/react-query";

export function UseGetStylesQuery() {
  return useQuery({queryKey: ["styles"], queryFn: async () => getStyles()});
}