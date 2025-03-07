import { getFighterProfiles } from "@/clients/fighter-profile-client";
import { useQuery } from "@tanstack/react-query";

export function UseGetFighterProfilesQuery() {
  return useQuery({queryKey: ["fighter-profiles"], queryFn: async () => getFighterProfiles()});
}