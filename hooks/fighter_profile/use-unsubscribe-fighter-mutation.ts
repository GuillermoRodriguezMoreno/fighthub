import { unsubscribeFighterFromClub } from "@/clients/fighter-profile-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUnsubscribeFighterFromClubMutation(
  fighterProfileId: number,
  clubId: number,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["unsubscribe-fighter", fighterProfileId, clubId],
    mutationFn: async ({
      unsubscribeFighterId,
      fromClubId,
    }: {
      unsubscribeFighterId: number;
      fromClubId: number;
    }) => {
      return unsubscribeFighterFromClub(unsubscribeFighterId, fromClubId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["club-fighters", String(clubId)],
      });
    },
  });
}
