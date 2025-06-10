import { newFight } from "@/clients/fight-client";
import { FightRequest } from "@/domains/fight";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateFightMutation(eventId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`new-fight`],
    mutationFn: async (newFightRequest: FightRequest) => {
      return newFight(newFightRequest);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fights", String(eventId)],
      });
    },
  });
}
