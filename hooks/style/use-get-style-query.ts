import { getStyle } from "@/clients/style-client";
import { useQuery } from "@tanstack/react-query";

export function UseGetStyleQuery(styleId: number) {
  return useQuery({
    queryKey: ["style"],
    queryFn: async () => getStyle(styleId),
  });
}
