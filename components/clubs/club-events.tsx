"use client";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Delete,
  Edit,
  MoreHorizontal,
  Pencil,
  Plus,
  Trash,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React from "react";
import Link from "next/link";
import { path } from "@/config/path";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import LoadingSpinner from "@/components/core/loading-spinner";
import { AlertError } from "@/components/core/alert-error";
import { FighterProfileResponse } from "@/domains/fighter-profile";
import { ClubResponse } from "@/domains/club";
import { UnsubscribeFighterDialog } from "@/components/clubs/unsubscribe-fighter-dialog";
import { UseGetFightersByClubQuery } from "@/hooks/fighter_profile/use-get-fighters-by-club-query";
import { ListElementSkeleton } from "@/components/core/list-element-skeleton";
import { EventResponse } from "@/domains/event";
import { DeleteEventDialog } from "../events/delete-event-dialog";
import { UseGetMyEventsQuery } from "@/hooks/event/use-get-my-events";

interface ClubEventsProps {
  clubEvents: EventResponse[];
  club: ClubResponse;
  isOrganizer?: boolean;
}

const ClubEvents = ({
  clubEvents,
  club,
  isOrganizer = false,
}: ClubEventsProps) => {
  const [deleteEventDialogIsOpen, setDeleteEventDialogIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventResponse | null>(
    null,
  );
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const handleDeleteClick = (event: EventResponse) => {
    setSelectedEvent(event);
    setDeleteEventDialogIsOpen(true);
  };

  const handleCancelDelete = () => {
    setSelectedEvent(null);
    setDeleteEventDialogIsOpen(false);
  };

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  const thereAreEvents = clubEvents.length !== 0;
  return (
    <section>
      <div className="container">
        <div className="mb-8 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16">
          <div className="flex flex-row items-center gap-5">
            <h2 className="text-2xl font-bold">Events</h2>
          </div>
          {thereAreEvents ? (
            <div className="mt-8 flex shrink-0 items-center justify-start gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={() => {
                  carouselApi?.scrollPrev();
                }}
                disabled={!canScrollPrev}
                className="disabled:pointer-events-auto"
              >
                <ArrowLeft className="size-5" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={() => {
                  carouselApi?.scrollNext();
                }}
                disabled={!canScrollNext}
                className="disabled:pointer-events-auto"
              >
                <ArrowRight className="size-5" />
              </Button>
            </div>
          ) : null}
        </div>
      </div>
      <div className="w-full">
        {thereAreEvents ? (
          <Carousel
            setApi={setCarouselApi}
            opts={{
              breakpoints: {
                "(max-width: 768px)": {
                  dragFree: true,
                },
              },
            }}
          >
            <CarouselContent>
              {clubEvents.map((event) => (
                <CarouselItem key={event.id} className="pl-4 md:max-w-[452px]">
                  <Link
                    href={`${path.dashboard.events.base}/${event.id}`}
                    className="group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex aspect-[3/2] overflow-clip rounded-xl">
                        <div className="flex-1">
                          <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                            <img
                              src="" //{fight.image}
                              alt={event.name}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-2 line-clamp-3 break-words pt-4 text-lg font-medium md:mb-3 md:pt-4 md:text-xl lg:pt-4 lg:text-2xl">
                      {/* {fight.title} */}
                    </div>
                    <div className="mb-8 line-clamp-2 text-sm text-muted-foreground md:mb-12 md:text-base lg:mb-9">
                      {/* {fight.summary} */}
                    </div>
                    <div className="flex items-center text-sm">
                      Read more{" "}
                      <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                  <div className="flex justify-end gap-5">
                    {isOrganizer ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            onClick={() => handleDeleteClick(event)}
                          >
                            <Delete className="size-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete Event</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : null}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <ListElementSkeleton entity={"club"} elements={"events"} />
        )}
      </div>
      {isOrganizer ? (
        <DeleteEventDialog
          event={selectedEvent || undefined}
          organizerEmail={club.ownerEmail}
          deleteEventDialogIsOpen={deleteEventDialogIsOpen}
          onCancel={handleCancelDelete}
          fromClub={true}
        />
      ) : null}
    </section>
  );
};

export function ClubEventsContainer({
  club,
  isOrganizer = false,
}: {
  club: ClubResponse;
  isOrganizer?: boolean;
}) {
  const clubId = club.id || -1;
  const organizerEmail = club.ownerEmail || "";
  const eventsByOrganizerQuery = UseGetMyEventsQuery(organizerEmail);
  if (eventsByOrganizerQuery.isLoading) {
    return <LoadingSpinner />;
  }
  if (eventsByOrganizerQuery.isError || !eventsByOrganizerQuery.data) {
    return <AlertError description="An error has ocurred getting events" />;
  }
  return (
    <ClubEvents
      club={club}
      clubEvents={eventsByOrganizerQuery.data.content}
      isOrganizer={isOrganizer}
    />
  );
}
