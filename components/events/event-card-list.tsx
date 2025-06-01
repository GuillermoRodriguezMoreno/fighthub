'use client'
import { path } from "@/config/path";
import { EventResponse } from "@/domains/event";
import { UseGetEventsQuery } from "@/hooks/event/use-get-events-query";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

type EventCardProps = {
    event: EventResponse;
}

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
                            <img
                                src=""
                                alt={event.name}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-2 line-clamp-3 break-words pt-4 text-lg font-medium md:mb-3 md:pt-4 md:text-xl lg:pt-4 lg:text-2xl">
                {event.name}
            </div>
            <div className="mb-8 line-clamp-2 text-sm text-muted-foreground md:mb-12 md:text-base lg:mb-9">
                {event.description}
            </div>
            <div className="flex items-center text-sm">
                Read more{" "}
                <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
            </div>
        </div>
    );
}

export function EventsList(){
    const allEventsQuery = UseGetEventsQuery()
    const isLoading = allEventsQuery.isLoading
    const events = allEventsQuery.data?.content || []
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (events.length === 0) {
        return <div>No events found</div>
    }
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
                <EventCard key={event.id} event={event} />
            ))}
        </div>
    )
}
