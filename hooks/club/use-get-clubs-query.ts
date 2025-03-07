import { getClubs } from "@/clients/club-client";
import { useQuery } from "@tanstack/react-query";

export function UseGetClubsQuery() {
  return useQuery({queryKey: ["clubs"], queryFn: async () => getClubs()});
}