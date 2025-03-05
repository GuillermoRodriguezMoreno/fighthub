import { NewClubs } from "@/components/dashboard/new-clubs";
import { PopularFighters } from "@/components/dashboard/popular-fighters";
import { UpcomingEvents } from "@/components/events/upcoming-events";

export default function Page() {
  return (
    <div className="flex flex-col gap-20">
      <UpcomingEvents />
      <PopularFighters />
      <NewClubs />
    </div>
  )
}
