"use client";
import { UseGetFighterProfileQuery } from "@/hooks/fighter_profile/use-get-fighter-profile-query";
import FighterProfileClubInfo from "../fighter-profile-club-info";
import FighterProfileInfo from "../fighter-profile-info";
import FighterProfilePhotos from "../fighter-profile-photos";
import { UpcomingFigtherFights } from "../fighter-profile-upcoming-fights";
import { FighterProfileResponse } from "@/domains/fighter-profile";
import { ClubResponse } from "@/domains/club";
import { useSession } from "next-auth/react";
import { UseGetMyFightsQuery } from "@/hooks/fight/use-get-my-fights";
import LoadingSpinner from "@/components/core/loading-spinner";
import { AlertInfo } from "@/components/core/alert-info";
import { FightResponse } from "@/domains/fight";
import { UseGetClubQuery } from "@/hooks/club/use-get-club-query";

type FighterProfilePageProps = {
  fighterProfile: FighterProfileResponse;
  club: ClubResponse | undefined;
  isAuthorized?: boolean;
  fights: FightResponse[];
};

export function FighterProfilePage({
  fighterProfile,
  club,
  fights,
  isAuthorized,
}: FighterProfilePageProps) {
  return (
    <>
      <h2 className="text-3xl font-semibold md:mb-4 md:text-4xl">Profile</h2>
      <FighterProfileInfo fighterProfile={fighterProfile} />
      <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-3 lg:gap-10 ">
        <div className="col-span-1">
          <FighterProfileClubInfo club={club} />
        </div>
        <div className="col-span-2">
          <FighterProfilePhotos />
        </div>
      </div>
      <UpcomingFigtherFights fights={fights} />
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

  if (
    fighterProfileQuery.isLoading ||
    fightsQuery.isLoading
  ) {
    return <LoadingSpinner />;
  }
  if (
    fighterProfileQuery.isError ||
    fightsQuery.isError
  ) {
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
