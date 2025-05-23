import { deleteUser } from "@/clients/user-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteUserMutation(userId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [`delete-user-${userId}`],
        mutationFn: async () => {
            return deleteUser(userId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
}