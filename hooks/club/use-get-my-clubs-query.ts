import { getMyClubs } from "@/clients/club-client";
import { useQuery } from "@tanstack/react-query";

export function UseGetMyClubsQuery(
  ownerEmail: string,
  enabled: boolean = true,
) {
  return useQuery({
    queryKey: ["my-clubs", ownerEmail],
    queryFn: async () => getMyClubs(ownerEmail),
    enabled,
  });
}
