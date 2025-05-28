import { newEvent } from "@/clients/event-client";
import { EventRequest } from "@/domains/event";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useNewEventMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [`new-event`],
        mutationFn: async (newEventRequest: EventRequest) => {
            return newEvent(newEventRequest);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
    });
}