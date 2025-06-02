import { getClubs } from "@/clients/club-client";
import { defaultQueryParams } from "@/clients/types";
import { useQuery } from "@tanstack/react-query";

export function UseGetClubsQuery(defaultQueryParams: defaultQueryParams) {
  return useQuery({
    queryKey: ["clubs", defaultQueryParams],
    queryFn: async () => getClubs(defaultQueryParams),
  });
}
