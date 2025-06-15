import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { FighterProfileResponse } from "@/domains/fighter-profile"
import FighterMatchCard from "../fighter-profiles/fighter-card"

type MatchesCarrouselProps = {
  fighters: FighterProfileResponse[]
}

export function MatchesCarrousel({ fighters }: MatchesCarrouselProps): React.JSX.Element {

  return (
    <div className="flex">
      <Carousel className="flex flex-col items-center  w-full">
        <CarouselContent className="rounded">
          {fighters.map((fighter) => (
            <div key={fighter.id} className="flex justify-center items-center">
              <CarouselItem key={fighter.id}>
                <FighterMatchCard fighter={fighter} />
              </CarouselItem>
            </div>
          ))}
        </CarouselContent>
        <div className="flex justify-center">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  )
}
