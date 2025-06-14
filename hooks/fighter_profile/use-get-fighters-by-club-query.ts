import { getFighterProfilesByClub } from "@/clients/fighter-profile-client";
import { useQuery } from "@tanstack/react-query";

export function UseGetFightersByClubQuery(clubId: number) {
  return useQuery({
    queryKey: ["club-fighters", String(clubId)],
    queryFn: async () => getFighterProfilesByClub(clubId),
  });
}
