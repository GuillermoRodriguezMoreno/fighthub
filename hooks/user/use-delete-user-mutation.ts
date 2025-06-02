import { deleteUser } from "@/clients/user-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteUserMutation(userId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`delete-user-${userId}`],
    mutationFn: async (deletedUserId: number) => {
      return deleteUser(deletedUserId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
