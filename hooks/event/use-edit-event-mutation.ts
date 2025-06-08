import { editEvent } from "@/clients/event-client";
import { EventRequest } from "@/domains/event";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useEditEventMutation(eventId: number) {
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
    onSuccess: (eventId) => {
      queryClient.invalidateQueries({ queryKey: ["event", eventId] });
    },
  });
}
