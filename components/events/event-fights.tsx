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
import LoadingSpinner from "../core/loading-spinner";
import { AlertError } from "../core/alert-error";
import { ListElementSkeleton } from "../core/list-element-skeleton";
import { FightCard } from "../fights/fight-card-list";

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
                    <FightCard fight={fight} event={event} />
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
          <ListElementSkeleton entity="event" elements="fights" />
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
