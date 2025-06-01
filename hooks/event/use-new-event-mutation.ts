import { newEvent } from "@/clients/event-client";
import { path } from "@/config/path";
import { EventRequest } from "@/domains/event";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useNewEventMutation() {
    const queryClient = useQueryClient();
    const router = useRouter();
    return useMutation({
        mutationKey: [`new-event`],
        mutationFn: async (newEventRequest: EventRequest) => {
            return newEvent(newEventRequest);
        },
        onSuccess: (newEventId) => {
            queryClient.invalidateQueries({ queryKey: ["events"] });
            router.push(`${path.dashboard.events.base}/${newEventId}`)
        },
    });
}