import { getFighterMatcher } from "@/clients/fighter-matcher-client";
import { useQuery } from "@tanstack/react-query";

export function UseGetFighterMatcherQuery(
  fighterId: number,
  enabled: boolean = true,
) {
  return useQuery({
    queryKey: ["fighter-matcher", fighterId],
    queryFn: async () => getFighterMatcher(fighterId),
    enabled,
    staleTime: 1000 * 60 * 5,
  });
}
