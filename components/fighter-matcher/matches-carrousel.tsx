import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FighterProfileResponse } from "@/domains/fighter-profile";
import FighterMatchCard from "../fighter-profiles/fighter-card";

type MatchesCarrouselProps = {
  fighters: FighterProfileResponse[];
};

export function MatchesCarrousel({
  fighters,
}: MatchesCarrouselProps): React.JSX.Element {
  return (
    <div className="flex">
      <Carousel className="flex flex-col items-center  w-full">
        <CarouselContent className="rounded">
          {fighters.map((fighter) => (
            <CarouselItem
              key={fighter.id}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <FighterMatchCard fighter={fighter} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
}
