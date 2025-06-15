import {
  updateFighterLocation,
  uploadFighterProfilePicture,
} from "@/clients/fighter-profile-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateFighterLocationMutation() {
  return useMutation({
    mutationKey: ["update-fighter-location"],
    mutationFn: async ({
      fighterId,
      coords,
    }: {
      fighterId: number;
      coords: { latitude: number; longitude: number };
    }) => {
      return updateFighterLocation(fighterId, coords);
    },
  });
}
