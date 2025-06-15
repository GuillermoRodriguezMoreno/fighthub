"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { path } from "@/config/path";

export default function FighterMatcherHomePage() {
  const router = useRouter();
  const handleClick = () => {
    router.push(path.dashboard.fighterMatcher.opponents);
  };
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.yellow.500/10),black)] opacity-30" />
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-8 flex justify-center">
          <Badge
            variant="secondary"
            className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-yellow-500 to-yellow-600 text-black border-0 font-semibold"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Powered by Advanced AI
          </Badge>
        </div>

        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Find Your Perfect
          <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-400 bg-clip-text text-transparent">
            {" "}
            AI-Matched{" "}
          </span>
          Opponent
        </h1>

        <p className="mt-6 text-lg leading-8 max-w-2xl mx-auto">
          Our intelligent matching system analyzes your skills, playstyle, and
          preferences to connect you with the perfect opponents for balanced,
          exciting matches every time.
        </p>
        <div className="mt-10 flex flex-col gap-5 items-center justify-center gap-x-6">
          <Button
            onClick={handleClick}
            size="lg"
            className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-semibold px-8 py-3 text-lg"
          >
            Start Matching
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <small>*We will need your location</small>
        </div>
      </div>
    </section>
  );
}
