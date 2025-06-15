"use client";

import { ArrowLeft, ArrowRight, Delete, Plus } from "lucide-react";
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
import { AddFighterToClubDialog } from "./add-fighter-to-club-dialog";

interface ClubFigthsProps {
  clubFighters: FighterProfileResponse[];
  club: ClubResponse;
  isOwner?: boolean;
}

const ClubFighters = ({
  clubFighters,
  club,
  isOwner = false,
}: ClubFigthsProps) => {
  const [unsubscribeFighterDialogIsOpen, setUnsubscribeFighterDialogIsOpen] =
    useState(false);
  const [addFighterDialogIsOpen, setAddFighterDialogIsOpen] = useState(false);
  const [selectedFighter, setSelectedFighter] =
    useState<FighterProfileResponse | null>(null);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const handleAddFighterClick = () => {
    setAddFighterDialogIsOpen(true);
  };

  const handleCancelAddFighter = () => {
    setAddFighterDialogIsOpen(false);
  };

  const handleUnsubscribeClick = (fighter: FighterProfileResponse) => {
    setSelectedFighter(fighter);
    setUnsubscribeFighterDialogIsOpen(true);
  };

  const handleCancelUnsubscribe = () => {
    setSelectedFighter(null);
    setUnsubscribeFighterDialogIsOpen(false);
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

  const thereAreFighters = clubFighters.length !== 0;
  return (
    <section>
      <div className="container">
        <div className="mb-8 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16">
          <div className="flex flex-row items-center gap-5">
            <h2 className="text-2xl font-bold">Fighters</h2>
            {isOwner ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={handleAddFighterClick}>
                    <Plus className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add fighter</p>
                </TooltipContent>
              </Tooltip>
            ) : null}
          </div>
          {thereAreFighters ? (
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
        {thereAreFighters ? (
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
              {clubFighters.map((fighter) => (
                <CarouselItem
                  key={fighter.id}
                  className="pl-4 md:max-w-[452px]"
                >
                  <Link
                    href={`${path.dashboard.fighters.base}/${fighter.id}`}
                    className="group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex aspect-[3/2] overflow-clip rounded-xl">
                        <div className="flex-1">
                          <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                            <img
                              src="" //{fight.image}
                              alt={fighter.name}
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
                    {isOwner ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            onClick={() => handleUnsubscribeClick(fighter)}
                          >
                            <Delete className="size-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Unsubscribe fighter</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : null}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <ListElementSkeleton entity={"club"} elements={"fighters"} />
        )}
      </div>
      {isOwner ? (
        <>
          <UnsubscribeFighterDialog
            fighter={selectedFighter}
            club={club}
            unsubscribeFighterDialogIsOpen={unsubscribeFighterDialogIsOpen}
            onCancel={handleCancelUnsubscribe}
          />
          <AddFighterToClubDialog
            addFighterToClubDialogIsOpen={addFighterDialogIsOpen}
            onCancel={handleCancelAddFighter}
            club={club}
          />
        </>
      ) : null}
    </section>
  );
};

export function ClubFightersContainer({
  club,
  isOwner = false,
}: {
  club: ClubResponse;
  isOwner?: boolean;
}) {
  const clubId = club.id || -1;
  const clubFightersQuery = UseGetFightersByClubQuery(clubId);
  if (clubFightersQuery.isLoading) {
    return <LoadingSpinner />;
  }
  if (clubFightersQuery.isError || !clubFightersQuery.data) {
    return <AlertError description="An error has ocurred getting fighters" />;
  }
  return (
    <ClubFighters
      club={club}
      clubFighters={clubFightersQuery.data.content}
      isOwner={isOwner}
    />
  );
}
