"use client";
import { UseGetEventQuery } from "@/hooks/event/use-get-event-query";
import { EventPictures } from "../event-pictures";
import { EventResponse } from "@/domains/event";
import { EventFightsContainer } from "../event-fights";
import { useState } from "react";
import { EditEventDialog } from "../edit-event-dialog";
import LoadingSpinner from "@/components/core/loading-spinner";
import { AlertInfo } from "@/components/core/alert-info";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Delete } from "lucide-react";
import { DeleteEventDialog } from "../delete-event-dialog";
import { useSession } from "next-auth/react";
import { UseGetMyClubsQuery } from "@/hooks/club/use-get-my-clubs-query";
import { EventDetailsCard } from "../event-details-card";

type EventPageProps = {
  event: EventResponse;
  isOrganizer?: boolean;
  organizerEmail: string;
};
function EventPage({
  event,
  isOrganizer = false,
  organizerEmail,
}: EventPageProps) {
  const [editEventDialogIsOpen, setEditEventDialogIsOpen] = useState(false);
  const [deleteEventDiallogIsOpen, setDeleteEventDialogIsOpen] =
    useState(false);
  const handleDeleteClick = () => {
    setDeleteEventDialogIsOpen(true);
  };
  const handleCancelDelete = () => {
    setDeleteEventDialogIsOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-5 mb-3 md:mb-4 lg:mb-10">
        <h2 className="text-3xl font-semibold md:text-4xl">{event.name}</h2>
        {isOrganizer ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" onClick={handleDeleteClick}>
                <Delete className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete event</p>
            </TooltipContent>
          </Tooltip>
        ) : null}
      </div>
      <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-3 lg:gap-10 mb-10">
        <div className="col-span-1">
          <EventPictures isOrganizer={isOrganizer} event={event} />
        </div>
        <div className="col-span-2">
          <EventDetailsCard
            event={event}
            clickEdit={() => setEditEventDialogIsOpen(true)}
            isOrganizer={isOrganizer}
          />
        </div>
      </div>

      {isOrganizer ? (
        <>
          <EditEventDialog
            event={event}
            editEventDialogIsOpen={editEventDialogIsOpen}
            onCancel={() => setEditEventDialogIsOpen(false)}
          />
          <DeleteEventDialog
            event={event}
            onCancel={handleCancelDelete}
            deleteEventDialogIsOpen={deleteEventDiallogIsOpen}
            organizerEmail={organizerEmail}
          />
        </>
      ) : null}
      <EventFightsContainer event={event} isOrganizer={isOrganizer} />
    </>
  );
}

type EventPageContainerProps = {
  eventId: string;
};

export function EventPageContainer({ eventId }: EventPageContainerProps) {
  const session = useSession();
  const organizerEmail = session.data?.user?.email || "";
  const eventQuery = UseGetEventQuery(eventId);
  const myClubsQuery = UseGetMyClubsQuery(organizerEmail, !!organizerEmail);

  if (eventQuery.isLoading || myClubsQuery.isLoading) {
    return <LoadingSpinner />;
  }
  if (eventQuery.isError || !eventQuery.data) {
    return <AlertInfo title="An Error has ocurred" variant="destructive" />;
  }
  if (!eventQuery.data || !myClubsQuery.data) {
    return <AlertInfo title="No event found" />;
  }

  const clubsId = myClubsQuery.data.map((club) => club.id);
  const isOrganizer = clubsId.includes(eventQuery.data.organizerId);

  return (
    <EventPage
      event={eventQuery.data}
      isOrganizer={isOrganizer}
      organizerEmail={organizerEmail}
    />
  );
}
