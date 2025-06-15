import { deleteClub } from "@/clients/club-client";
import { deleteEvent } from "@/clients/event-client";
import { path } from "@/config/path";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useDeleteClubMutation(clubId: number, ownerEmail: string) {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-club", clubId],
    mutationFn: async (deletedClubId: number) => {
      return deleteClub(deletedClubId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-clubs", ownerEmail],
      });
      router.push(path.dashboard.clubs.myClubs);
    },
  });
}
