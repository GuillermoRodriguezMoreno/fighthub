import { getFight } from "@/clients/fight-client";
import { useQuery } from "@tanstack/react-query";

export function UseGetFightQuery(fightId: number) {
  return useQuery({queryKey: ["fight"], queryFn: async () => getFight(fightId)});
}