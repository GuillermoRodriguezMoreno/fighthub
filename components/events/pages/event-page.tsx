"use client";
import { UseGetEventQuery } from "@/hooks/event/use-get-event-query";
import EventInfo from "../event-info";
import { EventPictures } from "../event-pictures";
import { EventResponse } from "@/domains/event";
import { EventFightsContainer } from "../event-fights";
import { EditElementHeader } from "@/components/core/edit-element-header";
import { useState } from "react";
import { EditEventDialog } from "../edit-event-dialog";

type EventPageProps = {
  event: EventResponse;
};
function EventPage({ event }: EventPageProps) {
  const [editEventDialogIsOpen, setEditEventDialogIsOpen] = useState(false);
  console.log("EventPage rendered with event:", editEventDialogIsOpen);
  return (
    <>
      <EditElementHeader
        title={"Event"}
        buttonContent={"Event"}
        onClick={() => setEditEventDialogIsOpen(true)}
      />
      <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-3 lg:gap-10 mb-10">
        <div className="col-span-1">
          <EventPictures />
        </div>
        <div className="col-span-2">
          <EventInfo event={event} />
        </div>
      </div>
      <EditEventDialog
        event={event}
        editEventDialogIsOpen={editEventDialogIsOpen}
        onCancel={() => setEditEventDialogIsOpen(false)}
      />
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
