import { getUser } from "@/clients/user-client";
import { useQuery } from "@tanstack/react-query";

export function UseGetUserQuery(userId: number) {
  return useQuery({queryKey: ["users"], queryFn: async () => getUser(userId)});
}