import { editEvent } from "@/clients/event-client";
import { EventRequest } from "@/domains/event";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useEditEventMutation(
  eventId: number,
  fromClub = false,
  organizerEmail: string = "",
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [`edit-event`, eventId],
    mutationFn: async ({
      eventId,
      editEventRequest,
    }: {
      eventId: number;
      editEventRequest: EventRequest;
    }) => {
      return editEvent(eventId, editEventRequest);
    },
    onSuccess: (event) => {
      if (fromClub) {
        queryClient.invalidateQueries({
          queryKey: ["my-events", organizerEmail],
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: ["event", String(event.id)],
        });
      }
    },
  });
}
