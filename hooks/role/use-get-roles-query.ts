import { getRoles } from "@/clients/roles-client";
import { useQuery } from "@tanstack/react-query";

export function UseGetRolesQuery() {
  return useQuery({ queryKey: ["roles"], queryFn: async () => getRoles() });
}
