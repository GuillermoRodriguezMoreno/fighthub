import { uploadFighterProfilePicture } from "@/clients/fighter-profile-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUploadFighterProfilePictureMutation(fighterId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["upload-fighter-picture", fighterId],
    mutationFn: async (file: File) => {
      return uploadFighterProfilePicture(file, String(fighterId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fighter-profile", String(fighterId)],
      });
    },
  });
}
