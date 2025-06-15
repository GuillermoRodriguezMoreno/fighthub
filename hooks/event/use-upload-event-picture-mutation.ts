import { uploadEventProfilePicture } from "@/clients/event-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUploadEventPictureMutation(eventId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["upload-event-picture", eventId],
    mutationFn: async (file: File) => {
      return uploadEventProfilePicture(file, String(eventId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["event", String(eventId)],
      });
    },
  });
}
