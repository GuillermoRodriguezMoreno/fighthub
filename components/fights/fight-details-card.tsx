import { Calendar, MapPin, User, Mail, Phone, Clock, Pen } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { path } from "@/config/path";
import Link from "next/link";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { FightResponse } from "@/domains/fight";

export default function FightDetailsCard({
  fight,
  clickEdit,
  isOrganizer = false,
}: {
  fight: FightResponse;
  clickEdit?: () => void;
  isOrganizer?: boolean;
}) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center gap-5">
        <h2 className="text-2xl font-bold">Info</h2>
        {isOrganizer ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={clickEdit}>
                <Pen />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit fight</p>
            </TooltipContent>
          </Tooltip>
        ) : null}
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold">
                {fight.blueCornerFighterName} VS {fight.redCornerFighterName}
              </CardTitle>
              <CardDescription className="text-base leading-relaxed">
                incredible fight description
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Location</p>
                <p className="text-sm text-muted-foreground">
                  {fight.eventName}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Date</p>
                <p className="text-sm text-muted-foreground">
                  {fight.fightOrder}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Time</p>
                <p className="text-sm text-muted-foreground">
                  incredible fight time
                </p>
              </div>
            </div>
          </div>
          <Separator />
        </CardContent>
      </Card>
    </div>
  );
}
