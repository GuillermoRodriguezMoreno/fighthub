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
import { Club } from "@/domains/club";
import { path } from "@/config/path";
import { useRouter } from "next/navigation";
import { UseGetClubsQuery } from "@/hooks/club/use-get-clubs-query";
import { AlertError } from "../core/alert-error";
import { AlertInfo } from "../core/alert-info";
import { Skeleton } from "../ui/skeleton";

interface NewClubsProps {
    newClubs: Club[]; 
}

export const NewClubs = ({ newClubs }: NewClubsProps): JSX.Element => {
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
    const plugin = React.useRef(
        Autoplay({ delay: 2000 }),
    )
    return (
        <section>
            <div className="container">
                <div className="mb-8 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16">
                    <div>
                        <h2 className="mb-3 text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
                            New Clubs
                        </h2>
                        <Link
                            href={path.dashboard.clubs.all}
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
                    plugins={[plugin.current]} onMouseEnter={plugin.current.stop}
                    onMouseLeave={() => plugin.current.play()}
                    className="relative left-[-1rem]"
                >
                    <CarouselContent className="-mr-4 ml-8 2xl:ml-[max(8rem,calc(50vw-700px+1rem))] 2xl:mr-[max(0rem,calc(50vw-700px-1rem))]">
                        {newClubs.map((club) => (
                            <CarouselItem key={club.id} className="pl-4 md:max-w-[452px]">
                                <div
                                    onClick={() => router.push(`${path.dashboard.clubs.base}/${club.id}`)}
                                    className="group flex flex-col justify-between cursor-pointer"
                                >
                                    <div>
                                        <div className="flex aspect-[3/2] overflow-clip rounded-xl">
                                            <div className="flex-1">
                                                <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                                                    <img
                                                        src=""
                                                        alt={club.name}
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-2 line-clamp-3 break-words pt-4 text-lg font-medium md:mb-3 md:pt-4 md:text-xl lg:pt-4 lg:text-2xl">
                                        {club.name}
                                    </div>
                                    <div className="mb-8 line-clamp-2 text-sm text-muted-foreground md:mb-12 md:text-base lg:mb-9">
                                        {club.description}
                                    </div>
                                    <div className="flex items-center text-sm">
                                        Read more{" "}
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

export const NewClubContainer = (): JSX.Element => {
    const newClubsQuery = UseGetClubsQuery({ size: 5, page: 0, orderBy: "createdAt" });
    const Loading = newClubsQuery.isLoading || !newClubsQuery.data
    const errorMessage = "Something went wrong";
    const emptyListMessage = "No Clubs found";

    if (newClubsQuery.isError) {
        return <AlertError description={errorMessage} />;
    }
    if (Loading) {
        return (
            <Skeleton className="h-[400px] w-full rounded-xl" />
        );
    }
    if (newClubsQuery.data.content.length === 0) {
        return <AlertInfo description={emptyListMessage} />;
    }
    return(
        <NewClubs newClubs={newClubsQuery.data.content} />
    )
}