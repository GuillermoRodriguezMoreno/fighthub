"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
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

interface GalleryItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  image: string;
}

interface UpcomingFigtherFightsProps {
  heading?: string;
  seeAllUrl?: string;
  items?: GalleryItem[];
}

const UpcomingFigtherFights = ({
  heading = "Upcoming Fights",
  seeAllUrl = "/dashboard/events/all",
  items = [
    {
      id: "item-1",
      title: "One Championship",
      summary:
        "Wadii vs. Khabib: The Ultimate Showdown. Who will emerge victorious in this epic battle of the titans?",
      url: "#",
      image: "/fight1.webp",
    },
    {
      id: "item-2",
      title: "UFC Fight Night",
      summary:
        "Wadii vs. McGregor: The Rematch. Will Wadii avenge his previous loss and emerge victorious this time?",
      url: "#",
      image: "/fight2.jpeg",
    },
    {
      id: "item-3",
      title: "Glory",
      summary:
        "Wadii vs. Silva: The Battle of the Century. Who will emerge victorious in this epic battle of the titans?",
      url: "#",
      image: "/fight3.jpeg",
    },
    {
      id: "item-4",
      title: "Gran Slam",
      summary:
        "Wadii vs. Jones: The Ultimate Showdown. Who will emerge victorious in this epic battle of the titans?",
      url: "#",
      image: "/fight4.jpeg",
    },
    {
      id: "item-5",
      title: "Nextgen Fight Night",
      summary:
        "Wadii vs Adesanya: The Rematch. Will Wadii avenge his previous loss and emerge victorious this time?",
      url: "#",
      image: "/fight5.jpeg",
    },
  ],
}: UpcomingFigtherFightsProps) => {
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
              {heading}
            </h2>
            <Link
              href={seeAllUrl}
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
            {items.map((item) => (
              <CarouselItem key={item.id} className="pl-4 md:max-w-[452px]">
                <a
                  href={item.url}
                  className="group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex aspect-[3/2] overflow-clip rounded-xl">
                      <div className="flex-1">
                        <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-2 line-clamp-3 break-words pt-4 text-lg font-medium md:mb-3 md:pt-4 md:text-xl lg:pt-4 lg:text-2xl">
                    {item.title}
                  </div>
                  <div className="mb-8 line-clamp-2 text-sm text-muted-foreground md:mb-12 md:text-base lg:mb-9">
                    {item.summary}
                  </div>
                  <div className="flex items-center text-sm">
                    View more{" "}
                    <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export { UpcomingFigtherFights };
