import { uploadClubProfilePicture } from "@/clients/club-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUploadClubPictureMutation(clubId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["upload-club-picture", clubId],
    mutationFn: async (file: File) => {
      return uploadClubProfilePicture(file, String(clubId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["club", String(clubId)],
      });
    },
  });
}
