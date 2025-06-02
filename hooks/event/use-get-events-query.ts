import { getEvents } from "@/clients/event-client";
import { defaultQueryParams } from "@/clients/types";
import { useQuery } from "@tanstack/react-query";

export function UseGetEventsQuery(
  defaultQueryParams: { page?: number; size?: number; orderBy?: string } = {
    page: 0,
    size: 25,
    orderBy: "startDate",
  },
) {
  return useQuery({
    queryKey: ["events", defaultQueryParams],
    queryFn: async () => getEvents(defaultQueryParams),
  });
}
