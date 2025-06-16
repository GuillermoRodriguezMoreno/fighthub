"use client";

import { UseGetFighterProfileQuery } from "@/hooks/fighter_profile/use-get-fighter-profile-query";
import FighterProfileClubInfo from "../fighter-profile-club-info";
import FighterProfileInfo from "../fighter-profile-info";
import { UpcomingFigtherFights } from "../fighter-profile-upcoming-fights";
import { FighterProfileResponse } from "@/domains/fighter-profile";
import { ClubResponse } from "@/domains/club";
import { useSession } from "next-auth/react";
import { UseGetMyFightsQuery } from "@/hooks/fight/use-get-my-fights";
import LoadingSpinner from "@/components/core/loading-spinner";
import { AlertInfo } from "@/components/core/alert-info";
import { FightResponse } from "@/domains/fight";
import { FighterProfilePictures } from "../fighter-profile-pictures";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EditFighterProfileDialog } from "../edit-fighter-profile-dialog";
import { useState } from "react";

type FighterProfilePageProps = {
  fighterProfile: FighterProfileResponse;
  club: ClubResponse;
  isAuthorized?: boolean;
  fights: FightResponse[];
};

export function FighterProfilePage({
  fighterProfile,
  club,
  fights,
  isAuthorized,
}: FighterProfilePageProps) {
  const [editProfileDialogIsOpen, setEditProfileDialogIsOpen] =
    useState<boolean>(false);

  const handleEditProfile = () => {
    setEditProfileDialogIsOpen(true);
  };
  const handleCloseEditProfile = () => {
    setEditProfileDialogIsOpen(false);
  };
  return (
    <>
      <div className="flex items-center gap-5">
        <h2 className="text-3xl font-semibold md:text-4xl">Profile</h2>
        {isAuthorized ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={handleEditProfile}>
                <Edit />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit profile</p>
            </TooltipContent>
          </Tooltip>
        ) : null}
      </div>
      <FighterProfileInfo fighterProfile={fighterProfile} />
      <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-3 lg:gap-10 ">
        <div className="col-span-1">
          <FighterProfileClubInfo club={club} />
        </div>
        <div className="col-span-2">
          <FighterProfilePictures
            isAuthorized={isAuthorized}
            fighterProfile={fighterProfile}
          />
        </div>
      </div>
      <UpcomingFigtherFights fights={fights} />
      {isAuthorized ? (
        <EditFighterProfileDialog
          editFighterProfileDialogIsOpen={editProfileDialogIsOpen}
          onCancel={handleCloseEditProfile}
          fighterProfile={fighterProfile}
        />
      ) : null}
    </>
  );
}

type FighterProfilePageContainerProps = {
  fighterProfileId: number;
};
export function FighterProfilePageContainer({
  fighterProfileId,
}: FighterProfilePageContainerProps) {
  const session = useSession();
  const userId = session.data?.userId || -1;
  const fighterProfileQuery = UseGetFighterProfileQuery(fighterProfileId);
  const fightsQuery = UseGetMyFightsQuery(fighterProfileId);

  if (fighterProfileQuery.isLoading || fightsQuery.isLoading) {
    return <LoadingSpinner />;
  }
  if (fighterProfileQuery.isError || fightsQuery.isError) {
    return <AlertInfo title="An Error has ocurred" variant="destructive" />;
  }
  if (!fighterProfileQuery.data) {
    return <AlertInfo title="No fighter found" />;
  }

  const club = fighterProfileQuery.data.club;
  const fights = fightsQuery.data?.content || [];
  const isAuthorized = fighterProfileQuery.data.userId === userId;

  return (
    <FighterProfilePage
      fighterProfile={fighterProfileQuery.data}
      isAuthorized={isAuthorized}
      club={club}
      fights={fights}
    />
  );
}
