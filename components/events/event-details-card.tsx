import { Calendar, MapPin, User, Mail, Phone, Clock, Edit } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { EventResponse } from "@/domains/event";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { path } from "@/config/path";
import Link from "next/link";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { DEFAULT_IMAGE_URL } from "@/domains/utils";

export function EventDetailsCard({
  event,
  clickEdit,
  isOrganizer = false,
}: {
  event: EventResponse;
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
                <Edit />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit event</p>
            </TooltipContent>
          </Tooltip>
        ) : null}
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold">{event.name}</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                {event.description}
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
                <p className="text-sm text-muted-foreground">{event.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Date</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(event.startDate)}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Time</p>
                <p className="text-sm text-muted-foreground">
                  {formatTime(event.startDate)} - {formatTime(event.endDate)}
                </p>
              </div>
            </div>
          </div>
          <Separator />
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <User className="h-5 w-5" />
              Organizer
            </h3>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-5">
                <Avatar className="h-14 w-14">
                  <AvatarImage
                    src={event.organizerProfilePicture || DEFAULT_IMAGE_URL}
                    alt="Profile picture"
                  />
                  <AvatarFallback>N/A</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium hover:text-primary">
                    <Link
                      href={`${path.dashboard.clubs.base}/${event.organizerId}`}
                    >
                      {event.organizerName}
                    </Link>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {event.organizerAddress}
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`mailto:${event.organizerEmail}`}
                    className="text-sm hover:underline"
                  >
                    {event.organizerEmail}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`tel:${event.organizerPhone}`}
                    className="text-sm hover:underline"
                  >
                    {event.organizerPhone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
