"use client";
import { path } from "@/config/path";
import { ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../core/loading-spinner";
import { AlertInfo } from "../core/alert-info";
import { FighterProfileResponse } from "@/domains/fighter-profile";
import { UseGetFighterProfilesQuery } from "@/hooks/fighter_profile/use-get-fighter-profiles-query";
import { UseGetMyFightersQuery } from "@/hooks/fighter_profile/use-get-my-fighters";

type FightersCardProps = {
  fighter: FighterProfileResponse;
};

export function FighterCard({ fighter }: FightersCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`${path.dashboard.fighters.base}/${fighter.id}`)}
      className="group flex flex-col justify-between cursor-pointer"
    >
      <div>
        <div className="flex aspect-[3/2] overflow-clip rounded-xl">
          <div className="flex-1">
            <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
              <img
                src=""
                alt={fighter.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mb-2 line-clamp-3 break-words pt-4 text-lg font-medium md:mb-3 md:pt-4 md:text-xl lg:pt-4 lg:text-2xl">
        {fighter.name}
      </div>
      <div className="mb-8 line-clamp-2 text-sm text-muted-foreground md:mb-12 md:text-base lg:mb-9">
        {fighter.biography}
      </div>
      <div className="flex items-center text-sm">
        Read more{" "}
        <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );
}

export function AllFightersListContainer() {
  const allFightersQuery = UseGetFighterProfilesQuery();
  const isLoading = allFightersQuery.isLoading;
  const isError = allFightersQuery.isError;
  const fighters = allFightersQuery.data?.content || [];
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return (
      <AlertInfo
        variant="destructive"
        title="Error loading fighters"
        description="There was an error loading the fighters. Please try again later."
      />
    );
  }
  if (fighters.length === 0) {
    return <AlertInfo title="No fighters found" />;
  }
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {fighters.map((fighter) => (
        <FighterCard key={fighter.id} fighter={fighter} />
      ))}
    </div>
  );
}

export function MyFightersListContainer() {
  const session = useSession();
  const userId = session.data?.userId || -1;
  const myFightersQuery = UseGetMyFightersQuery(userId, userId !== -1);
  const isLoading = myFightersQuery.isLoading || !myFightersQuery.data;
  const isError = myFightersQuery.isError;
  const fighters = myFightersQuery.data || [];
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return (
      <AlertInfo
        variant="destructive"
        title="Error loading your fights"
        description="There was an error loading your fighters. Please try again later."
      />
    );
  }
  if (fighters.length === 0) {
    return <AlertInfo title="No fighters found" />;
  }
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {fighters.map((fight) => (
        <FighterCard key={fight.id} fighter={fight} />
      ))}
    </div>
  );
}
