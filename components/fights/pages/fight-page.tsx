"use client";
import { FightPictures } from "../fight-pictures";
import { useState } from "react";
import LoadingSpinner from "@/components/core/loading-spinner";
import { AlertInfo } from "@/components/core/alert-info";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Delete } from "lucide-react";
import { useSession } from "next-auth/react";
import { UseGetMyClubsQuery } from "@/hooks/club/use-get-my-clubs-query";
import { FightResponse } from "@/domains/fight";
import FightDetailsCard from "../fight-details-card";
import { DeleteFightDialog } from "../delete-fight-dialog";
import { EditFightDialog } from "../edit-fight-dialog";
import { UseGetFightQuery } from "@/hooks/fight/use-get-fight-query";
import { UseGetEventQuery } from "@/hooks/event/use-get-event-query";
import { EventResponse } from "@/domains/event";

type FightPageProps = {
  fight: FightResponse;
  event: EventResponse;
  isOrganizer?: boolean;
};
function FightPage({ fight, isOrganizer = false, event }: FightPageProps) {
  const [editFightDialogIsOpen, setEditFightDialogIsOpen] = useState(false);
  const [deleteFightDialogIsOpen, setDeleteFightDialogIsOpen] = useState(false);
  const handleDeleteClick = () => {
    setDeleteFightDialogIsOpen(true);
  };
  const handleCancelDelete = () => {
    setDeleteFightDialogIsOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-5 mb-3 md:mb-4 lg:mb-10">
        <h2 className="text-3xl font-semibold md:text-4xl">
          {fight.blueCornerFighterName} vs {fight.redCornerFighterName}
        </h2>
        {isOrganizer ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" onClick={handleDeleteClick}>
                <Delete className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete fight</p>
            </TooltipContent>
          </Tooltip>
        ) : null}
      </div>
      <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-3 lg:gap-10 mb-10">
        <div className="col-span-1">
          <FightPictures />
        </div>
        <div className="col-span-2">
          <FightDetailsCard
            fight={fight}
            clickEdit={() => setEditFightDialogIsOpen(true)}
            isOrganizer={isOrganizer}
          />
        </div>
      </div>

      {isOrganizer ? (
        <>
          <EditFightDialog
            fight={fight}
            editFightDialogIsOpen={editFightDialogIsOpen}
            event={event}
            onCancel={() => setEditFightDialogIsOpen(false)}
          />
          <DeleteFightDialog
            fight={fight}
            onCancel={handleCancelDelete}
            deleteFightDialogIsOpen={deleteFightDialogIsOpen}
            event={event}
          />
        </>
      ) : null}
    </>
  );
}

type FightPageContainerProps = {
  fightId: number;
};

export function FightPageContainer({ fightId }: FightPageContainerProps) {
  const session = useSession();
  const organizerEmail = session.data?.user?.email || "";
  const fightQuery = UseGetFightQuery(fightId);
  const fightEventId = fightQuery.data?.eventId;
  const eventQuery = UseGetEventQuery(String(fightEventId), !!fightEventId);
  const myClubsQuery = UseGetMyClubsQuery(organizerEmail, !!organizerEmail);

  if (fightQuery.isLoading || eventQuery.isLoading) {
    return <LoadingSpinner />;
  }
  if (fightQuery.isError || !eventQuery.data) {
    return <AlertInfo title="An Error has ocurred" variant="destructive" />;
  }
  if (!fightQuery.data || !eventQuery.data) {
    return <AlertInfo title="No event found" />;
  }

  const myClubs = myClubsQuery.data || [];
  const clubsId = myClubs.map((club) => club.id);
  const isOrganizer = clubsId.includes(eventQuery.data.organizerId);

  return (
    <FightPage
      fight={fightQuery.data}
      event={eventQuery.data}
      isOrganizer={isOrganizer}
    />
  );
}
