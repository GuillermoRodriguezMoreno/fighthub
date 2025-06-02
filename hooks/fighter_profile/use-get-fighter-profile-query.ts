import { getFighterProfile } from "@/clients/fighter-profile-client";
import { useQuery } from "@tanstack/react-query";

export function UseGetFighterProfileQuery(fighterProfileId: number) {
  return useQuery({
    queryKey: ["fighter-profile"],
    queryFn: async () => getFighterProfile(fighterProfileId),
  });
}
