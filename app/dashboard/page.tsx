import { NewClubContainer, NewClubs } from "@/components/dashboard/new-clubs";
import { PopularFightersContainer } from "@/components/dashboard/popular-fighters";
import { UpcomingEventsContainer } from "@/components/events/upcoming-events";

export default function Page() {
  return (
    <div className="flex flex-col gap-20">
      <UpcomingEventsContainer />
      <PopularFightersContainer />
      <NewClubContainer />
    </div>
  )
}
