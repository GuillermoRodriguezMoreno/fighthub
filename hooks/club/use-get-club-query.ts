import { getClub } from "@/clients/club-client";
import { useQuery } from "@tanstack/react-query";

export function UseGetClubQuery(clubId: number) {
  return useQuery({ queryKey: ["club"], queryFn: async () => getClub(clubId) });
}
