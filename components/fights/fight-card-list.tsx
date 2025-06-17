"use client";
import { path } from "@/config/path";
import { Calendar, MapPin, Trophy, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../core/loading-spinner";
import { AlertInfo } from "../core/alert-info";
import { FightResponse } from "@/domains/fight";
import { UseGetFightsQuery } from "@/hooks/fight/use-get-fights-query";
import { UseGetMyFightsQuery } from "@/hooks/fight/use-get-my-fights";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { EventResponse } from "@/domains/event";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { formatDate } from "@/lib/utils";

type FightCardProps = {
  fight: FightResponse;
  event?: EventResponse;
};

export function FightCard({ fight, event }: FightCardProps) {
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(`${path.dashboard.fights.base}/${fight.id}`)}
      className="w-full max-w-md mx-auto hover:shadow-lg hover:scale-105 transition-transform duration-300"
    >
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <CardTitle className="text-lg">Fight {fight.fightOrder}</CardTitle>
        </div>
        <Badge variant="secondary" className="mx-auto">
          {`Weight - ${fight.weight} Kg`}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center space-y-2 flex-1">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder.svg?height=64&width=64" />
              <AvatarFallback className="bg-red-100 text-red-700 font-bold">
                N/A
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="font-semibold text-sm">
                {fight.blueCornerFighterName}
              </h3>
              <p className="text-xs text-muted-foreground">
                {fight.category || ""}
              </p>
              <Badge variant="outline" className="text-xs mt-1">
                {fight.blueCornerFighterClub || "Unknown Club"}
              </Badge>
            </div>
          </div>

          <div className="flex flex-col items-center px-4">
            <div className="text-2xl font-bold text-red-500">VS</div>
            <Users className="h-4 w-4 text-muted-foreground mt-1" />
          </div>

          <div className="flex flex-col items-center space-y-2 flex-1">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder.svg?height=64&width=64" />
              <AvatarFallback className="bg-blue-100 text-blue-700 font-bold">
                N/A
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="font-semibold text-sm">
                {fight.redCornerFighterName}
              </h3>
              <p className="text-xs text-muted-foreground">
                {fight.category || ""}
              </p>
              <Badge variant="outline" className="text-xs mt-1">
                {fight.redCornerFighterClub || "Unknown Club"}
              </Badge>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Date:</span>
            <span className="text-muted-foreground">
              {formatDate(event?.startDate)}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Location:</span>
            <span className="text-muted-foreground">
              {event?.address || "Unknown"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Trophy className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Type:</span>
            <span className="text-muted-foreground">
              {fight.titleFight ? "Title fight" : "Rank fight"}
            </span>
          </div>
        </div>

        <Separator />

        <div className="text-center">
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            {event?.name}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export function AllFightsListContainer() {
  const allFightsQuery = UseGetFightsQuery();
  const isLoading = allFightsQuery.isLoading;
  const isError = allFightsQuery.isError;
  const fights = allFightsQuery.data?.content || [];
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return (
      <AlertInfo
        variant="destructive"
        title="Error loading events"
        description="There was an error loading the fights. Please try again later."
      />
    );
  }
  if (fights.length === 0) {
    return <AlertInfo title="No fights found" />;
  }
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {fights.map((fight) => (
        <FightCard key={fight.id} fight={fight} />
      ))}
    </div>
  );
}

export function MyFightsListContainer() {
  const session = useSession();
  const userId = session.data?.userId || -1;
  const myFightsQuery = UseGetMyFightsQuery(userId, !!userId);
  const isLoading = myFightsQuery.isLoading || !myFightsQuery.data;
  const isError = myFightsQuery.isError;
  const fights = myFightsQuery.data?.content || [];
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return (
      <AlertInfo
        variant="destructive"
        title="Error loading your fights"
        description="There was an error loading your fights. Please try again later."
      />
    );
  }
  if (fights.length === 0) {
    return <AlertInfo title="No fights found" />;
  }
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {fights.map((fight) => (
        <FightCard key={fight.id} fight={fight} />
      ))}
    </div>
  );
}
