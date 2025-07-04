"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { JSX, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { path } from "@/config/path";
import { useRouter } from "next/navigation";
import { UseGetFighterProfilesQuery } from "@/hooks/fighter_profile/use-get-fighter-profiles-query";
import { AlertError } from "../core/alert-error";
import { AlertInfo } from "../core/alert-info";
import { FighterProfileResponse } from "@/domains/fighter-profile";
import { DashboardSkeleton } from "./dashboard-skeleton";
import Image from "next/image";
import { DEFAULT_IMAGE_URL } from "@/domains/utils";

interface PopularFightersProps {
  popularFighters: FighterProfileResponse[];
}

export const PopularFighters = ({
  popularFighters,
}: PopularFightersProps): JSX.Element => {
  const router = useRouter();
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
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
  const plugin = React.useRef(Autoplay({ delay: 2000 }));
  return (
    <section>
      <div className="container">
        <div className="mb-8 flex flex-col justify-between md:mb-14 md:flex-row lg:mb-16">
          <div>
            <Link
              href={path.dashboard.fighters.all}
              className="group flex items-center gap-1 text-sm font-medium md:text-base lg:text-lg"
            >
              See all
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mt-8 flex shrink-0 items-center justify-start gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollPrev();
                plugin.current.stop();
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
                plugin.current.stop();
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
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={() => plugin.current.play()}
          className="relative left-[-1rem]"
        >
          <CarouselContent className="-mr-4 ml-8 2xl:ml-[max(8rem,calc(50vw-700px+1rem))] 2xl:mr-[max(0rem,calc(50vw-700px-1rem))]">
            {popularFighters.map((fighter) => (
              <CarouselItem key={fighter.id} className="pl-4 md:max-w-[452px]">
                <div
                  onClick={() =>
                    router.push(`${path.dashboard.fighters.base}/${fighter.id}`)
                  }
                  className="group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex aspect-[3/2] overflow-clip rounded-xl">
                      <div className="flex-1">
                        <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                          <Image
                            src={fighter.profilePicture || DEFAULT_IMAGE_URL}
                            alt={fighter.name || "Unknown Fighter"}
                            className="h-full w-full object-cover object-center"
                            layout="fill"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-2 line-clamp-3 break-words pt-4 text-lg font-medium md:mb-3 md:pt-4 md:text-xl lg:pt-4 lg:text-2xl">
                    {fighter.name}
                  </div>
                  <div className="mb-8 line-clamp-2 text-sm text-muted-foreground md:mb-12 md:text-base lg:mb-9">
                    {fighter.biography || "No biography available"}
                  </div>
                  <div className="flex items-center text-sm">
                    See more{" "}
                    <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export const PopularFightersContent = (): JSX.Element => {
  const popularFightersQuery = UseGetFighterProfilesQuery({
    size: 5,
    page: 0,
    orderBy: "winsInARow",
  });
  const isQueryLoading =
    popularFightersQuery.isLoading || !popularFightersQuery.data;
  const errorMessage = "Something went wrong";
  const emptyListMessage = "No fighters found";

  if (popularFightersQuery.isError) {
    return <AlertError description={errorMessage} />;
  }
  if (isQueryLoading) {
    return <DashboardSkeleton />;
  }
  if (popularFightersQuery.data.content.length === 0) {
    return <AlertInfo title="Not found" description={emptyListMessage} />;
  }
  return (
    <PopularFighters popularFighters={popularFightersQuery.data.content} />
  );
};

export const PopularFightersContainer = (): JSX.Element => {
  return (
    <div>
      <h2 className="mb-3 text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-10">
        Popular Fighters
      </h2>
      <PopularFightersContent />
    </div>
  );
};
