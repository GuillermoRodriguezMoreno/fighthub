import { getEvent } from "@/clients/event-client";
import { useQuery } from "@tanstack/react-query";

export function UseGetEventQuery(eventId: string) {
  return useQuery({
    queryKey: ["event", eventId],
    queryFn: async () => getEvent(eventId),
  });
}
