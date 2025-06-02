import { getRole } from "@/clients/roles-client";
import { useQuery } from "@tanstack/react-query";

export function UseGetRoleQuery(roleId: number) {
  return useQuery({ queryKey: ["role"], queryFn: async () => getRole(roleId) });
}
