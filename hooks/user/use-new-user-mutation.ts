import { newUser } from "@/clients/user-client";
import { NewUserRequest } from "@/domains/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useNewUserMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [`new-user`],
        mutationFn: async (newUserRequest: NewUserRequest) => {
            return newUser(newUserRequest);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
}