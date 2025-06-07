import { EventPageContainer } from "@/components/events/pages/event-page";

export default function Page({ params }: { params: { event_id: string } }) {
  return <EventPageContainer eventId={params.event_id} />;
}
