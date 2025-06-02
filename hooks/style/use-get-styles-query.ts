import { getStyles } from "@/clients/style-client";
import { useQuery } from "@tanstack/react-query";

export function UseGetStylesQuery() {
  return useQuery({ queryKey: ["styles"], queryFn: async () => getStyles() });
}
