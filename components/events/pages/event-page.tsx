"use client";
import { UseGetEventQuery } from "@/hooks/event/use-get-event-query";
import EventInfo from "../event-info";
import { EventPictures } from "../event-pictures";
import { EventResponse } from "@/domains/event";
import { EventFightsContainer } from "../event-fights";
import { EditElementHeader } from "@/components/core/edit-element-header";
import { useState } from "react";
import { EditEventDialog } from "../edit-event-dialog";
import LoadingSpinner from "@/components/core/loading-spinner";
import { AlertInfo } from "@/components/core/alert-info";

type EventPageProps = {
  event: EventResponse;
};
function EventPage({ event }: EventPageProps) {
  const [editEventDialogIsOpen, setEditEventDialogIsOpen] = useState(false);
  return (
    <>
      <EditElementHeader title={event.name} />
      <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-3 lg:gap-10 mb-10">
        <div className="col-span-1">
          <EventPictures />
        </div>
        <div className="col-span-2">
          <EventInfo
            event={event}
            clickEdit={() => setEditEventDialogIsOpen(true)}
          />
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
    return <LoadingSpinner />;
  }
  if (eventQuery.isError) {
    return <AlertInfo title="An Error has ocurred" variant="destructive" />;
  }
  if (!eventQuery.data) {
    return <AlertInfo title="No event found" />;
  }
  return <EventPage event={eventQuery.data} />;
}
