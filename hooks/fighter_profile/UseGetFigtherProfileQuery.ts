import { getFighterProfile } from "@/clients/FighterProfileClient";
import { useQuery } from "@tanstack/react-query";

export function UseGetFighterProfileQuery(fighterProfileId: number) {
  return useQuery({queryKey: ["fighter-profile"], queryFn: async () => getFighterProfile(fighterProfileId)});
}