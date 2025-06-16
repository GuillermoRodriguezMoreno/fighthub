import { getFighterProfile } from "@/clients/fighter-profile-client";
import { useQuery } from "@tanstack/react-query";

export function UseGetFighterProfileQuery(fighterProfileId: number, enabled: boolean = true) {
  return useQuery({
    queryKey: ["fighter-profile", fighterProfileId],
    queryFn: async () => getFighterProfile(fighterProfileId),
    enabled,
  });
}
