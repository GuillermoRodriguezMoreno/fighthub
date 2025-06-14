import { getClub } from "@/clients/club-client";
import { useQuery } from "@tanstack/react-query";

export function UseGetClubQuery(clubId: string) {
  return useQuery({
    queryKey: ["club", clubId],
    queryFn: async () => getClub(clubId),
  });
}
