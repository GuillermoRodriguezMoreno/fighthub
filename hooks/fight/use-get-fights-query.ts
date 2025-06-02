import { getFights } from "@/clients/fight-client";
import { useQuery } from "@tanstack/react-query";

export function UseGetFightsQuery() {
  return useQuery({ queryKey: ["fights"], queryFn: async () => getFights() });
}
