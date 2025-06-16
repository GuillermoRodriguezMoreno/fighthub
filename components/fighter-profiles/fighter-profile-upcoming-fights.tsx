"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
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
import { path } from "@/config/path";
import { ListElementSkeleton } from "../core/list-element-skeleton";
import { FightCard } from "../fights/fight-card-list";

interface UpcomingFigtherFightsProps {
  fights: FightResponse[];
}

const UpcomingFigtherFights = ({ fights }: UpcomingFigtherFightsProps) => {
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

  return (
    <section>
      <div className="container">
        <div className="mb-8 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16">
          <div>
            <h2 className="mb-3 text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
              Fights
            </h2>
          </div>
          {fights.length > 0 ? (
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
        {fights.length > 0 ? (
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
              {fights.map((fight) => (
                <CarouselItem key={fight.id} className="pl-4 md:max-w-[452px]">
                  <Link
                    href={`${path.dashboard.fights.base}/${fight.id}`}
                    className="group flex flex-col justify-between"
                  >
                    <FightCard fight={fight} />
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <ListElementSkeleton entity="Fighter" elements="Fights" />
        )}
      </div>
    </section>
  );
};

export { UpcomingFigtherFights };
