import { EventPageContainer } from "@/components/events/pages/event-page";


export default async function Page({
  params,
}: {
  params: Promise<{ event_id: string }>
}) {
  const { event_id } = await params;
  return <EventPageContainer eventId={event_id} />;
}
