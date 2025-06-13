import { getMyEvents } from "@/clients/event-client";
import { useQuery } from "@tanstack/react-query";

export function UseGetMyEventsQuery(
  organizerEmail: string,
  enabled: boolean = true,
) {
  return useQuery({
    queryKey: ["my-events", organizerEmail],
    queryFn: async () => getMyEvents(organizerEmail),
    enabled,
  });
}
