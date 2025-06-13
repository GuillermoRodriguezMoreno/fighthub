import { newClub } from "@/clients/club-client";
import { path } from "@/config/path";
import { ClubRequest } from "@/domains/club";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useNewClubMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationKey: [`new-club`],
    mutationFn: async (newClubRequest: ClubRequest) => {
      return newClub(newClubRequest);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["clubs", String(response.id)],
      });
      router.push(`${path.dashboard.clubs.base}/${response.id}`);
    },
  });
}
