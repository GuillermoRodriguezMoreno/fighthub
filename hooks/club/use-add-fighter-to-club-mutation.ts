import { joinClub } from "@/clients/club-client";
import { AddFighterToClubRequest } from "@/domains/fighter-profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddFighterToClubMutation(clubId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`add-fighter-to-club`, clubId],
    mutationFn: async (addFighterId: number) => {
      return joinClub(clubId, addFighterId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["club-fighters", String(clubId)],
      });
    },
  });
}
