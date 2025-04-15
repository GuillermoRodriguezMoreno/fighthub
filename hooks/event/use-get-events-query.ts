import { getEvents } from "@/clients/event-client";
import { defaultQueryParams } from "@/clients/types";
import { useQuery } from "@tanstack/react-query";

export function UseGetEventsQuery(defaultQueryParams: defaultQueryParams) {
  return useQuery({queryKey: ["events", defaultQueryParams], queryFn: async () => getEvents(defaultQueryParams)});
}