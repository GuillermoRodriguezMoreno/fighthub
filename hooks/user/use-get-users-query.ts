import { getUsers } from "@/clients/user-client";
import { useQuery } from "@tanstack/react-query";

export function UseGetUsersQuery() {
  return useQuery({queryKey: ["user"], queryFn: async () => getUsers()});
}