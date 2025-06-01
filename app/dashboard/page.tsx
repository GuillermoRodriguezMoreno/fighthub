'use client'
import { NewClubContainer, NewClubs } from "@/components/dashboard/new-clubs";
import { PopularFightersContainer } from "@/components/dashboard/popular-fighters";
import { UpcomingEventsDashboardContainer } from "@/components/dashboard/upcoming-events-dashboard";
import { useSession } from "next-auth/react";

export default function Page() {
  return (
    <div className="flex flex-col gap-20">
      <UpcomingEventsDashboardContainer />
      <PopularFightersContainer />
      <NewClubContainer />
    </div>
  )
}
