"use client";
import { NewClubContainer } from "@/components/dashboard/new-clubs";
import { PopularFightersContainer } from "@/components/dashboard/popular-fighters";
import { UpcomingEventsDashboardContainer } from "@/components/dashboard/upcoming-events-dashboard";

export default function Page() {
  return (
    <div className="flex flex-col gap-20">
      <UpcomingEventsDashboardContainer />
      <PopularFightersContainer />
      <NewClubContainer />
    </div>
  );
}
