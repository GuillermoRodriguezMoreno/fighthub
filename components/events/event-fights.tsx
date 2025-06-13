"use client";

import { ArrowLeft, ArrowRight, Delete, Edit, Plus } from "lucide-react";
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
import { FightResponse } from "@/domains/fight";
import { UseGetFightsByEventQuery } from "@/hooks/fight/use-get-fights-by-event-query";
import { path } from "@/config/path";
import { EventResponse } from "@/domains/event";
import { CreateFightDialog } from "../fights/create-fight-dialog";
import { EditFightDialog } from "../fights/edit-fight-dialog";
import { DeleteFightDialog } from "../fights/delete-fight-dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { EventFightsSkeleton } from "./event-fights-skeleton";
import LoadingSpinner from "../core/loading-spinner";
import { AlertError } from "../core/alert-error";

interface EventFigthsProps {
  eventFights: FightResponse[];
  event: EventResponse;
  isOrganizer?: boolean;
}

const EventFights = ({
  eventFights,
  event,
  isOrganizer = false,
}: EventFigthsProps) => {
  const [createFightDialogIsOpen, setCreateFightDialogIsOpen] = useState(false);
  const [editFightDialogIsOpen, setEditFightDialogIsOpen] = useState(false);
  const [deleteFightDialogIsOpen, setDeleteFightDialogIsOpen] = useState(false);
  const [selectedFight, setSelectedFight] = useState<FightResponse | null>(
    null,
  );
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const handleEditClick = (fight: FightResponse) => {
    setSelectedFight(fight);
    setEditFightDialogIsOpen(true);
  };

  const handleCancelEdit = () => {
    setEditFightDialogIsOpen(false);
    setSelectedFight(null);
  };

  const handleDeleteClick = (fight: FightResponse) => {
    setSelectedFight(fight);
    setDeleteFightDialogIsOpen(true);
  };

  const handleCancelDelete = () => {
    setDeleteFightDialogIsOpen(false);
    setSelectedFight(null);
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

  const thereAreFights = eventFights.length !== 0;
  return (
    <section>
      <div className="container">
        <div className="mb-8 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16">
          <div className="flex flex-row items-center gap-5">
            <h2 className="text-2xl font-bold">Fights</h2>
            {isOrganizer ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={() => setCreateFightDialogIsOpen(true)}>
                    <Plus />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add fight</p>
                </TooltipContent>
              </Tooltip>
            ) : null}
          </div>
          {thereAreFights ? (
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
        {thereAreFights ? (
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
              {eventFights.map((fight) => (
                <CarouselItem key={fight.id} className="pl-4 md:max-w-[452px]">
                  <Link
                    href={`${path.dashboard.fights.base}/${fight.id}`}
                    className="group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex aspect-[3/2] overflow-clip rounded-xl">
                        <div className="flex-1">
                          <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                            <img
                              src="" //{fight.image}
                              alt={fight.eventName}
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
                      <>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              onClick={() => handleEditClick(fight)}
                            >
                              <Edit className="size-5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit fight</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              onClick={() => handleDeleteClick(fight)}
                            >
                              <Delete className="size-5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete fight</p>
                          </TooltipContent>
                        </Tooltip>
                      </>
                    ) : null}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <EventFightsSkeleton />
        )}
      </div>
      {isOrganizer ? (
        <>
          <CreateFightDialog
            event={event}
            createFightDialogIsOpen={createFightDialogIsOpen}
            onCancel={() => setCreateFightDialogIsOpen(false)}
          />
          <EditFightDialog
            editFightDialogIsOpen={editFightDialogIsOpen}
            fight={selectedFight}
            event={event}
            onCancel={handleCancelEdit}
          />
          <DeleteFightDialog
            fight={selectedFight}
            event={event}
            deleteFightDialogIsOpen={deleteFightDialogIsOpen}
            onCancel={handleCancelDelete}
          />
        </>
      ) : null}
    </section>
  );
};

export function EventFightsContainer({
  event,
  isOrganizer = false,
}: {
  event: EventResponse;
  isOrganizer?: boolean;
}) {
  const eventFightsQuery = UseGetFightsByEventQuery(String(event.id));
  if (eventFightsQuery.isLoading) {
    return <LoadingSpinner />;
  }
  if (eventFightsQuery.isError || !eventFightsQuery.data) {
    return <AlertError description="An error has ocurred getting fights" />;
  }
  return (
    <EventFights
      event={event}
      eventFights={eventFightsQuery.data.content}
      isOrganizer={isOrganizer}
    />
  );
}
