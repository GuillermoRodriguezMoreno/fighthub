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
import { FightResponse } from "@/domains/fight";
import { UseGetFightsByEventQuery } from "@/hooks/fight/use-get-fights-by-event-query";
import { path } from "@/config/path";
import { EventResponse } from "@/domains/event";
import { CreateFightDialog } from "../fights/create-fight-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { EditFightDialog } from "../fights/edit-fight-dialog";
import { DeleteFightDialog } from "../fights/delete-fight-dialog";

interface EventFigthsProps {
  heading?: string;
  eventFights: FightResponse[];
  event: EventResponse;
}

const EventFigths = ({
  heading = "Fights",
  eventFights,
  event,
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
  console.log("eventFights", selectedFight);
  return (
    <section>
      <div className="container">
        <div className="mb-8 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16">
          <div className="flex flex-row items-center gap-5">
            <h2 className="text-2xl font-bold">Fights</h2>
            <Button onClick={() => setCreateFightDialogIsOpen(true)}>
              <Plus />
            </Button>
          </div>
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
        </div>
      </div>
      <div className="w-full">
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
                <div className="flex">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleEditClick(fight)}>
                        <Pencil />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteClick(fight)}
                      >
                        <Trash />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
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
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
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
    </section>
  );
};

export function EventFightsContainer({ event }: { event: EventResponse }) {
  const eventFightsQuery = UseGetFightsByEventQuery(String(event.id));
  if (eventFightsQuery.isLoading) {
    return <div>Loading...</div>;
  }
  if (eventFightsQuery.isError) {
    return <div>Error loading event fights</div>;
  }
  if (!eventFightsQuery.data) {
    return <div>No fights found for this event</div>;
  }

  return (
    <EventFigths event={event} eventFights={eventFightsQuery.data.content} />
  );
}
