"use client";
import { path } from "@/config/path";
import { EventResponse } from "@/domains/event";
import { UseGetEventsQuery } from "@/hooks/event/use-get-events-query";
import { UseGetMyEventsQuery } from "@/hooks/event/use-get-my-events";
import { ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../core/loading-spinner";
import { AlertInfo } from "../core/alert-info";
import Image from "next/image";
import { DEFAULT_IMAGE_URL } from "@/domains/utils";

type EventCardProps = {
  event: EventResponse;
};

export function EventCard({ event }: EventCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`${path.dashboard.events.base}/${event.id}`)}
      className="group flex flex-col justify-between cursor-pointer"
    >
      <div>
        <div className="flex aspect-[3/2] overflow-clip rounded-xl">
          <div className="flex-1">
            <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
              <Image
                src={event.profilePicture || DEFAULT_IMAGE_URL}
                alt={event.name || "Unknown Event"}
                className="h-full w-full object-cover object-center"
                layout="fill"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mb-2 line-clamp-3 break-words pt-4 text-lg font-medium md:mb-3 md:pt-4 md:text-xl lg:pt-4 lg:text-2xl">
        {event.name || "Unknown Event"}
      </div>
      <div className="mb-8 line-clamp-2 text-sm text-muted-foreground md:mb-12 md:text-base lg:mb-9">
        {event.description || "No description available"}
      </div>
      <div className="flex items-center text-sm">
        See more{" "}
        <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );
}

export function AllEventsListContainer() {
  const allEventsQuery = UseGetEventsQuery();
  const isLoading = allEventsQuery.isLoading;
  const isError = allEventsQuery.isError;
  const events = allEventsQuery.data?.content || [];
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return (
      <AlertInfo
        variant="destructive"
        title="Error loading events"
        description="There was an error loading the events. Please try again later."
      />
    );
  }
  if (events.length === 0) {
    return <AlertInfo title="No events found" />;
  }
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export function MyEventsListContainer() {
  const session = useSession();
  const organizerEmail = session.data?.user?.email || "";
  const myEventsQuery = UseGetMyEventsQuery(organizerEmail, !!organizerEmail);
  const isLoading = myEventsQuery.isLoading || !myEventsQuery.data;
  const isError = myEventsQuery.isError;
  const events = myEventsQuery.data?.content || [];
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return (
      <AlertInfo
        variant="destructive"
        title="Error loading your events"
        description="There was an error loading your events. Please try again later."
      />
    );
  }
  if (events.length === 0) {
    return <AlertInfo title="No events found" />;
  }
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
