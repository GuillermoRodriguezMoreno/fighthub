import { getFights } from "@/clients/FightClient";
import { useQuery } from "@tanstack/react-query";

export function UseGetFightsQuery() {
  return useQuery({queryKey: ["fights"], queryFn: async () => getFights()});
}