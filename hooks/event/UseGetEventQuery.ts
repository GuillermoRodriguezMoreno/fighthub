import { getEvent } from "@/clients/EventClient";
import { useQuery } from "@tanstack/react-query";

export function UseGetEventQuery(eventId: number) {
  return useQuery({queryKey: ["event"], queryFn: async () => getEvent(eventId)});
}