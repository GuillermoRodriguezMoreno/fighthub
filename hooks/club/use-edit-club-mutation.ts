import { editClub } from "@/clients/club-client";
import { editEvent } from "@/clients/event-client";
import { ClubRequest } from "@/domains/club";
import { EventRequest } from "@/domains/event";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useEditClubMutation(clubId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`edit-club`, clubId],
    mutationFn: async ({
      clubId,
      editClubRequest,
    }: {
      clubId: number;
      editClubRequest: ClubRequest;
    }) => {
      return editClub(clubId, editClubRequest);
    },
    onSuccess: (club) => {
      queryClient.invalidateQueries({ queryKey: ["club", String(club.id)] });
    },
  });
}
