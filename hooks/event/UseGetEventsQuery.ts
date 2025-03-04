import { getEvents } from "@/clients/EventClient";
import { useQuery } from "@tanstack/react-query";

export function UseGetEventsQuery() {
  return useQuery({queryKey: ["events"], queryFn: async () => getEvents()});
}