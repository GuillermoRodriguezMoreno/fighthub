import { getClubs } from "@/clients/ClubClient";
import { useQuery } from "@tanstack/react-query";

export function UseGetClubsQuery() {
  return useQuery({queryKey: ["clubs"], queryFn: async () => getClubs()});
}