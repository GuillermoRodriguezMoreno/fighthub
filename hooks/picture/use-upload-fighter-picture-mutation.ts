import { uploadFighterPicture } from "@/clients/picture-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUploadFighterPictureMutation(fighterId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["upload-fighter-picture", fighterId],
    mutationFn: async (file: File) => {
      return uploadFighterPicture(file, String(fighterId));
    },
  });
}
