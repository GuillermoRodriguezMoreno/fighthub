import { newFight } from "@/clients/fight-client";
import { FightRequest } from "@/domains/fight";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateFightMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`new-fight`],
    mutationFn: async (newFightRequest: FightRequest) => {
      return newFight(newFightRequest);
    },
    onSuccess: (fightResponse) => {
      queryClient.invalidateQueries({
        queryKey: ["fights", fightResponse.eventId],
      });
    },
  });
}
