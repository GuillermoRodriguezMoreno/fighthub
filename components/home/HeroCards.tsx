import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Check, GithubIcon, Linkedin } from "lucide-react";
import { MapIcon } from "./Icons";
import Image from "next/image";
import Link from "next/link";
import { path } from "@/config/path";

export const HeroCards = () => {
  return (
    <div className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]">
      {/* Testimonial */}
      <Card className="absolute w-[340px] -top-[15px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Avatar>
            <AvatarImage alt="" src="/profile-photo2.webp" />
            <AvatarFallback>SH</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <CardTitle className="text-lg">Wadii Kadiri</CardTitle>
            <CardDescription>@wazaek</CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          This platform helped me connect with top-level fighters and find my
          next big fight!
        </CardContent>
      </Card>

      {/* Team */}
      <Card className="absolute right-[20px] top-4 w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="mt-8 flex justify-center items-center pb-2">
          <Image
            src="/profile-photo.jpeg"
            alt="user avatar"
            width={100}
            height={100}
            className="absolute grayscale-[0%] -top-12 rounded-full w-24 h-24 aspect-square object-cover"
          />
          <CardTitle className="text-center">Guillermo Rodriguez</CardTitle>
          <CardDescription className="font-normal text-primary">
            Founder
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center pb-2">
          <p>
            Passionate about pushing my limits and helping others grow in combat
            sports.
          </p>
        </CardContent>

        <CardFooter>
          <div>
            <a
              rel="noreferrer noopener"
              href="https://github.com/GuillermoRodriguezMoreno"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">Github icon</span>
              <GithubIcon className="w-5 h-5" />
            </a>
            <a
              rel="noreferrer noopener"
              href="https://www.linkedin.com/in/guillermo-rodr%C3%ADguez-moreno-b91568272/"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">Linkedin icon</span>
              <Linkedin size="20" />
            </a>
          </div>
        </CardFooter>
      </Card>

      {/* Pricing */}
      <Card className="absolute top-[200px] left-[50px] w-72  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader>
          <CardTitle className="flex item-center justify-between">
            Free
            <Badge variant="secondary" className="text-sm text-primary">
              Most popular
            </Badge>
          </CardTitle>
          <div>
            <span className="text-3xl font-bold">$0</span>
            <span className="text-muted-foreground"> /month</span>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {[
              "Create and showcase your fighter profile 🥊",
              "Find and connect with other fighters 🌎",
              "Get access to upcoming fight opportunities 🔥",
            ].map((benefit: string) => (
              <span key={benefit} className="flex">
                <Check className="text-green-500" />{" "}
                <h3 className="ml-2">{benefit}</h3>
              </span>
            ))}
          </div>
        </CardContent>
        <hr className="w-4/5 m-auto mb-4" />
        <CardFooter>
          <Button className="w-full">
            <Link href={path.signin} className="w-100">
              Get started
            </Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Service */}
      <Card className="absolute w-[350px] -right-[10px] bottom-[10px]  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
          <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
            <MapIcon />
          </div>
          <div>
            <CardTitle>Find Fights, Clubs & Events</CardTitle>
            <CardDescription className="text-md mt-2">
              Connect with promoters, gyms, and other fighters to find fights
              and build your record.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};
