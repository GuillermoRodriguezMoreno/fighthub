import { getMyFighters } from "@/clients/fighter-profile-client";
import { useQuery } from "@tanstack/react-query";

export function UseGetMyFightersQuery(
  userId: number,
  enabled: boolean = false,
) {
  return useQuery({
    queryKey: ["my-fighters", userId],
    queryFn: async () => getMyFighters(userId),
    enabled,
  });
}
