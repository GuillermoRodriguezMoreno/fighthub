"use client";
import { path } from "@/config/path";
import { ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../core/loading-spinner";
import { AlertInfo } from "../core/alert-info";
import { FightResponse } from "@/domains/fight";
import { UseGetFightsQuery } from "@/hooks/fight/use-get-fights-query";
import { UseGetMyFightsQuery } from "@/hooks/fight/use-get-my-fights";

type FightCardProps = {
  fight: FightResponse;
};

export function FightCard({ fight }: FightCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`${path.dashboard.fights.base}/${fight.id}`)}
      className="group flex flex-col justify-between cursor-pointer"
    >
      <div>
        <div className="flex aspect-[3/2] overflow-clip rounded-xl">
          <div className="flex-1">
            <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
              <img
                src=""
                alt={fight.eventName}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mb-2 line-clamp-3 break-words pt-4 text-lg font-medium md:mb-3 md:pt-4 md:text-xl lg:pt-4 lg:text-2xl">
        {fight.blueCornerFighterName} vs {fight.redCornerFighterName}
      </div>
      <div className="mb-8 line-clamp-2 text-sm text-muted-foreground md:mb-12 md:text-base lg:mb-9">
        {fight.eventName} - {fight.fightOrder}
      </div>
      <div className="flex items-center text-sm">
        Read more{" "}
        <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );
}

export function AllFightsListContainer() {
  const allFightsQuery = UseGetFightsQuery();
  const isLoading = allFightsQuery.isLoading;
  const isError = allFightsQuery.isError;
  const fights = allFightsQuery.data?.content || [];
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return (
      <AlertInfo
        variant="destructive"
        title="Error loading events"
        description="There was an error loading the fights. Please try again later."
      />
    );
  }
  if (fights.length === 0) {
    return <AlertInfo title="No fights found" />;
  }
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {fights.map((fight) => (
        <FightCard key={fight.id} fight={fight} />
      ))}
    </div>
  );
}

export function MyFightsListContainer() {
  const session = useSession();
  const userId = session.data?.userId || -1;
  const myFightsQuery = UseGetMyFightsQuery(userId, !!userId);
  const isLoading = myFightsQuery.isLoading || !myFightsQuery.data;
  const isError = myFightsQuery.isError;
  const fights = myFightsQuery.data?.content || [];
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return (
      <AlertInfo
        variant="destructive"
        title="Error loading your fights"
        description="There was an error loading your fights. Please try again later."
      />
    );
  }
  if (fights.length === 0) {
    return <AlertInfo title="No fights found" />;
  }
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {fights.map((fight) => (
        <FightCard key={fight.id} fight={fight} />
      ))}
    </div>
  );
}
