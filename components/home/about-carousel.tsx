"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type AboutItem = {
  title: string;
  subTitle?: string;
  description: string;
};

const items: AboutItem[] = [
  {
    title: "About",
    subTitle: "FightHub",
    description:
      "At FightHub, we are driven by a deep passion for combat sports and a commitment to building the ultimate network for fighters, coaches, and promoters. Our platform is designed to connect and empower athletes at every stage of their journey—whether you’re a seasoned professional, an up-and-coming talent, or just stepping into the world of K1, Muay Thai, and MMA. Through FightHub, you gain access to exclusive opportunities, events, and a like-minded community that shares your dedication to the fight game. We believe in creating a space where warriors can grow, inspire, and be recognized on a global scale.",
  },
  {
    title: "Our",
    subTitle: "Mission",
    description:
      "Our mission is to empower fighters by providing a dynamic platform where they can connect, grow, and showcase their talent on a global stage. We aim to create a thriving community that bridges fighters, coaches, and fans, offering opportunities for exposure, collaboration, and personal development. Whether you're an aspiring athlete or an experienced professional, our platform is built to support your journey in combat sports, helping you gain recognition and take your career to the next level.",
  },
  {
    title: "Our",
    subTitle: "Vision",
    description:
      "Our vision is to become the leading digital hub for combat sports, creating a unified space where fighters, gyms, and event organizers from around the world can connect effortlessly. We strive to revolutionize the way combat athletes network, gain exposure, and access new opportunities, fostering a stronger and more connected global fighting community. By leveraging technology, we aim to break barriers, making combat sports more accessible, visible, and rewarding for everyone involved.",
  },
];

export function CarouselCard({ title, subTitle, description }: AboutItem) {
  return (
    <div className="bg-green-0 flex">
      <div className="pb-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          {title}{" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            {subTitle}
          </span>
        </h2>
        <p className="text-xl text-muted-foreground mt-4">{description}</p>
      </div>
    </div>
  );
}

export function AboutCarousel() {
  const plugin = React.useRef(Autoplay({ delay: 3000 }));
  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={() => plugin.current.play()}
    >
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <CarouselCard {...item} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-center">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
}
