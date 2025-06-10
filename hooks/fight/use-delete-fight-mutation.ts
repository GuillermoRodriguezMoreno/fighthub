import { deleteFight } from "@/clients/fight-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteFightMutation(eventId: number, fightId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-fight", { fightId }],
    mutationFn: async (deletedFightId: number) => {
      return deleteFight(deletedFightId);
    },
    onSuccess: (eventId) => {
      queryClient.invalidateQueries({
        queryKey: ["fights", eventId],
      });
    },
  });
}
