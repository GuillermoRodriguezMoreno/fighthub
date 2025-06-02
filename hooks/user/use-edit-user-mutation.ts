import { editUser } from "@/clients/user-client";
import { EditUserRequest } from "@/domains/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useEditUserMutation(userId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`edit-user-${userId}`],
    mutationFn: async (editUserRequest: EditUserRequest) => {
      return editUser(userId, editUserRequest);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
