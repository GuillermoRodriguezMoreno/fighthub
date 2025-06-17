import { EventPageContainer } from "@/components/events/pages/event-page";

type Props = { params: { event_id: string } };

export default async function Page({
  params,
}: Props) {
  const { event_id } = await params;
  return <EventPageContainer eventId={event_id} />;
}
