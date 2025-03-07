import { getEvents } from "@/clients/event-client";
import { useQuery } from "@tanstack/react-query";

export function UseGetEventsQuery() {
  return useQuery({queryKey: ["events"], queryFn: async () => getEvents()});
}