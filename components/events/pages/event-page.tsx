"use client";
import { UseGetEventQuery } from "@/hooks/event/use-get-event-query";
import EventInfo from "../event-info";
import EventPhotos from "../event-photos";
import { EventResponse } from "@/domains/event";
import { EventFightsContainer } from "../event-fights";

type EventPageProps = {
  event: EventResponse;
};
function EventPage({ event }: EventPageProps) {
  return (
    <>
      <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-3 lg:gap-10 mb-10">
        <div className="col-span-2">
          <EventPhotos />
        </div>
        <div className="col-span-1">
          <EventInfo />
        </div>
      </div>
      <EventFightsContainer eventId={event.id} />
    </>
  );
}

type EventPageContainerProps = {
  eventId: string;
};

export function EventPageContainer({ eventId }: EventPageContainerProps) {
  const eventQuery = UseGetEventQuery(eventId);
  if (eventQuery.isLoading) {
    return <div>Loading...</div>;
  }
  if (eventQuery.isError) {
    return <div>Error loading event</div>;
  }
  if (!eventQuery.data) {
    return <div>No event found</div>;
  }
  return <EventPage event={eventQuery.data} />;
}
