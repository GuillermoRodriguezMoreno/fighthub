import { getMyEvents } from "@/clients/event-client";
import { useQuery } from "@tanstack/react-query";

export function UseGetEventsByClubQuery(
  organizerEmail: string,
  enabled: boolean = true,
) {
  return useQuery({
    queryKey: ["my-events", organizerEmail],
    queryFn: async () => getMyEvents(organizerEmail),
    enabled,
  });
}
