import { getFightingMatching } from "@/clients/fighting-matching-client";
import { useQuery } from "@tanstack/react-query";

export function UseGetFightingMatchingQuery(fighterId: number) {
  return useQuery({
    queryKey: ["fighting-matching", fighterId],
    queryFn: async () => getFightingMatching(fighterId),
  });
}
