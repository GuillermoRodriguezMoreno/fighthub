import { getFightsByEvent } from "@/clients/fight-client";
import { useQuery } from "@tanstack/react-query";

export function UseGetFightsByEventQuery(eventId: string) {
  return useQuery({
    queryKey: [`fights-${eventId}`],
    queryFn: async () => getFightsByEvent(eventId),
  });
}
