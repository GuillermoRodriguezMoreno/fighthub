"use client";

import { AlertInfo } from "@/components/core/alert-info";
import LoadingSpinner from "@/components/core/loading-spinner";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ClubResponse } from "@/domains/club";
import { UseGetClubQuery } from "@/hooks/club/use-get-club-query";
import { Delete } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { ClubPictures } from "@/components/clubs/club-pictures";
import ClubInfo from "@/components/clubs/club-info";
import { EditClubDialog } from "@/components/clubs/edit-club-dialog";
import { DeleteClubDialog } from "@/components/clubs/delete-club-dialog";
import { ClubFightersContainer } from "@/components/clubs/club-fighters";
import { ClubEventsContainer } from "../club-events";

type ClubPageProps = {
  club: ClubResponse;
};
function ClubPage({ club }: ClubPageProps) {
  const session = useSession();
  const ownerId = session.data?.userId || "";
  const ownerEmail = session.data?.user?.email || "";
  const isOwner = ownerId === club.ownerId;
  const [editClubDialogIsOpen, setEditClubDialogIsOpen] = useState(false);
  const [deleteClubDiallogIsOpen, setDeleteClubDialogIsOpen] = useState(false);
  const handleDeleteClick = () => {
    setDeleteClubDialogIsOpen(true);
  };
  const handleCancelDelete = () => {
    setDeleteClubDialogIsOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-5 mb-3 md:mb-4 lg:mb-10">
        <h2 className="text-3xl font-semibold md:text-4xl">{club.name}</h2>
        {isOwner ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" onClick={handleDeleteClick}>
                <Delete className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete club</p>
            </TooltipContent>
          </Tooltip>
        ) : null}
      </div>
      <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-3 lg:gap-10 mb-10">
        <div className="col-span-1">
          <ClubPictures club={club} isOwner={isOwner} />
        </div>
        <div className="col-span-2">
          <ClubInfo
            club={club}
            clickEdit={() => setEditClubDialogIsOpen(true)}
            isOwner={isOwner}
          />
        </div>
      </div>

      {isOwner ? (
        <>
          <EditClubDialog
            club={club}
            ownerId={ownerId}
            editClubDialogIsOpen={editClubDialogIsOpen}
            onCancel={() => setEditClubDialogIsOpen(false)}
          />
          <DeleteClubDialog
            club={club}
            onCancel={handleCancelDelete}
            deleteClubDialogIsOpen={deleteClubDiallogIsOpen}
            ownerEmail={ownerEmail}
          />
        </>
      ) : null}
      <div className="flex flex-col gap-10">
        <ClubFightersContainer club={club} isOwner={isOwner} />
        <ClubEventsContainer club={club} isOwner={isOwner} />
      </div>
    </>
  );
}

type ClubPageContainerProps = {
  clubId: string;
};

export function ClubPageContainer({ clubId }: ClubPageContainerProps) {
  const clubQuery = UseGetClubQuery(clubId);

  if (clubQuery.isLoading) {
    return <LoadingSpinner />;
  }
  if (clubQuery.isError) {
    return <AlertInfo title="An Error has ocurred" variant="destructive" />;
  }
  if (!clubQuery.data) {
    return <AlertInfo title="No event found" />;
  }

  return <ClubPage club={clubQuery.data} />;
}
