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
import { UseGetEventsQuery } from "@/hooks/event/use-get-events-query";
import { AlertError } from "../core/alert-error";
import { AlertInfo } from "../core/alert-info";
import { useRouter } from "next/navigation";
import { EventResponse } from "@/domains/event";
import { DashboardSkeleton } from "./dashboard-skeleton";
import Image from 'next/image';
import { DEFAULT_IMAGE_URL } from "@/domains/utils";


interface UpcomingEventsDashboardProps {
  upcommingEvents: EventResponse[];
}

export const UpcomingEventsDashboard = ({
  upcommingEvents,
}: UpcomingEventsDashboardProps): JSX.Element => {
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
              href={path.dashboard.events.all}
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
            {upcommingEvents.map((event) => (
              <CarouselItem key={event.id} className="pl-4 md:max-w-[452px]">
                <div
                  onClick={() =>
                    router.push(`${path.dashboard.events.base}/${event.id}`)
                  }
                  className="group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex aspect-[3/2] overflow-clip rounded-xl">
                      <div className="flex-1">
                        <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                          <Image
                            src={event.profilePicture || DEFAULT_IMAGE_URL}
                            alt={event.name}
                            className="h-full w-full object-cover object-center"
                            layout="fill"
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

export const UpcomingEventsDashboardContent = (): JSX.Element => {
  const eventsQuery = UseGetEventsQuery({
    page: 0,
    size: 5,
    orderBy: "startDate",
  });

  const isQueryLoading = eventsQuery.isLoading || !eventsQuery.data;
  const errorMessage = "Something went wrong";
  const emptyListMessage = "No events found";

  if (eventsQuery.isError) {
    return <AlertError description={errorMessage} />;
  }
  if (isQueryLoading) {
    return <DashboardSkeleton />;
  }
  if (eventsQuery.data.content.length === 0) {
    return <AlertInfo title="Not found" description={emptyListMessage} />;
  }

  return <UpcomingEventsDashboard upcommingEvents={eventsQuery.data.content} />;
};

export const UpcomingEventsDashboardContainer = (): JSX.Element => {
  return (
    <div>
      <h2 className="mb-3 text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-10">
        Upcoming events
      </h2>
      <UpcomingEventsDashboardContent />
    </div>
  );
};
