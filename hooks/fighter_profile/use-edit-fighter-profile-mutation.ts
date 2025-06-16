import { editEvent } from "@/clients/event-client";
import { editFighterProfile } from "@/clients/fighter-profile-client";
import { EventRequest } from "@/domains/event";
import { EditFighterProfileRequest } from "@/domains/fighter-profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useEditFighterProfileMutation(fighterProfileId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`edit-fighter-profile`, fighterProfileId],
    mutationFn: async ({
      fighterProfileId,
      editFighterProfileRequest,
    }: {
      fighterProfileId: number;
      editFighterProfileRequest: EditFighterProfileRequest;
    }) => {
      return editFighterProfile(fighterProfileId, editFighterProfileRequest);
    },
    onSuccess: (fighterProfile) => {
      queryClient.invalidateQueries({
        queryKey: ["fighter-profile", String(fighterProfile.id)],
      });
    },
  });
}
