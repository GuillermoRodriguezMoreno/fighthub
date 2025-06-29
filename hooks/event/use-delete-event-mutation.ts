import { deleteEvent } from "@/clients/event-client";
import { path } from "@/config/path";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useDeleteEventMutation(
  eventId: number,
  organizerEmail: string,
  fromClub: boolean = false,
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-event", eventId],
    mutationFn: async (deletedEventId: number) => {
      return deleteEvent(deletedEventId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-events", organizerEmail],
      });
      if (!fromClub) {
        router.push(path.dashboard.events.myEvents);
      }
    },
  });
}
