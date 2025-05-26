import { getMyClubs } from "@/clients/club-client";
import { useQuery } from "@tanstack/react-query";

export function UseGetMyClubsQuery(ownerId: number) {
  return useQuery({queryKey: [`my-clubs-${ownerId}`], queryFn: async () => getMyClubs(ownerId)});
}