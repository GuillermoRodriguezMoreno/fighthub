import { getFighterProfiles } from "@/clients/FighterProfileClient";
import { useQuery } from "@tanstack/react-query";

export function UseGetFighterProfilesQuery() {
  return useQuery({queryKey: ["fighter-profiles"], queryFn: async () => getFighterProfiles()});
}