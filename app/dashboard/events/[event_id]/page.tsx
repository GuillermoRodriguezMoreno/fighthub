import { EventFigths } from "@/components/events/event-fights";
import EventInfo from "@/components/events/event-info";
import EventPhotos from "@/components/events/event-photos";

export default function Page() {
  return (
    <>
      <h2 className="text-3xl font-semibold md:mb-4 md:text-4xl">Event</h2>
      <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-3 lg:gap-10 ">
        <div className="col-span-2">
          <EventPhotos />
        </div>
        <div className="col-span-1">
          <EventInfo />
        </div>
      </div>
      <EventFigths />
    </>
  );
}
