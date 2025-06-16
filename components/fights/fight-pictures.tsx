import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogClose, DialogContent } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import Image from "next/image";
import { Button } from "../ui/button";
import { CircleX } from "lucide-react";
import { DEFAULT_IMAGE_URL } from "@/domains/utils";

export function FightPictures() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Photos</h2>
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="p-1 ">
                    <Card className="flex rounded-md overflow-hidden p-0 ">
                      <CardContent className="relative w-full aspect-square p-0">
                        <Image
                          src={DEFAULT_IMAGE_URL}
                          alt={`Imagen ${index + 1}`}
                          fill
                          className="object-cover rounded-md hover:scale-105 transition-transform duration-300 ease-in-out"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-3xl p-0 bg-transparent shadow-none">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      // Add real url
                      src={"/profile-photo.jpeg"}
                      alt={`Imagen ${index + 1}`}
                      width={800}
                      height={480}
                      className="rounded-md object-contain"
                    />
                    <DialogClose asChild>
                      <Button
                        className="absolute top-4 right-4"
                        aria-label="close"
                      >
                        <CircleX />
                      </Button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
