import { getFighterProfiles } from "@/clients/fighter-profile-client";
import { defaultQueryParams } from "@/clients/types";
import { useQuery } from "@tanstack/react-query";

export function UseGetFighterProfilesQuery(defaultQueryParams: defaultQueryParams) {
  return useQuery({queryKey: ["fighter-profiles", defaultQueryParams], queryFn: async () => getFighterProfiles(defaultQueryParams)});
}