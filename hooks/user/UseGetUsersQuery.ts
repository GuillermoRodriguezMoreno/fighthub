import { getUsers } from "@/clients/UserClient";
import { useQuery } from "@tanstack/react-query";

export function UseGetUsersQuery() {
  return useQuery({queryKey: ["user"], queryFn: async () => getUsers()});
}