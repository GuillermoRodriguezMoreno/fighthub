import { editFight, newFight } from "@/clients/fight-client";
import { FightRequest } from "@/domains/fight";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useEditFightMutation(eventId: number, fightId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`edit-fight`, fightId],
    mutationFn: async ({
      fightId,
      editFightRequest,
    }: {
      fightId: number;
      editFightRequest: FightRequest;
    }) => {
      return editFight(fightId, editFightRequest);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fights", String(eventId)],
      });
    },
  });
}
