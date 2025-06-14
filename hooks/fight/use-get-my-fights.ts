import { getMyFights } from "@/clients/fight-client";
import { useQuery } from "@tanstack/react-query";

export function UseGetMyFightsQuery(
  fighterId: number,
  enabled: boolean = true,
) {
  return useQuery({
    queryKey: ["my-fights", fighterId],
    queryFn: async () => getMyFights(fighterId),
    enabled,
  });
}
