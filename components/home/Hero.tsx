import { Button, buttonVariants } from "@/components/ui/button";
import { HeroCards } from "./HeroCards";
import { Github } from "lucide-react";
import { path } from "@/config/path";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#f7d950]  to-[#caa608] text-transparent bg-clip-text">
              FightHub
            </span>{" "}
            the platform
          </h1>{" "}
          for{" "}
          <h2 className="inline">
            real{" "}
            <span className="inline bg-gradient-to-r from-[#f7d950]  to-[#caa608] text-transparent bg-clip-text">
              Fighters
            </span>{" "}
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Join fighters worldwide. Share your story, find fights, and build your legacy.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Button className="w-full md:w-1/3"><Link href={path.signin} className="w-100" >Get started</Link></Button>

          <a
            rel="noreferrer noopener"
            href="https://github.com/GuillermoRodriguezMoreno/fighthub"
            target="_blank"
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "outline",
            })}`}
          >
            Github Repository
            <Github className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
