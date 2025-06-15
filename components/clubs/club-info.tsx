import { MapPin, User, Mail, Phone, Pen } from "lucide-react";
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
import { ClubResponse } from "@/domains/club";

export default function ClubCard({
  club,
  clickEdit,
  isOwner = false,
}: {
  club: ClubResponse;
  clickEdit?: () => void;
  isOwner?: boolean;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center gap-5">
        <h2 className="text-2xl font-bold">Info</h2>
        {isOwner ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={clickEdit}>
                <Pen />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit club</p>
            </TooltipContent>
          </Tooltip>
        ) : null}
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold">{club.name}</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                {club.description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Address</p>
                <p className="text-sm text-muted-foreground">{club.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{club.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-sm text-muted-foreground">{club.phone}</p>
              </div>
            </div>
          </div>
          <Separator />
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <User className="h-5 w-5" />
              Owner
            </h3>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-5">
                <Avatar className="h-14 w-14">
                  <AvatarImage
                    src="/placeholder.svg?height=56&width=56"
                    alt="Profile picture"
                  />
                  <AvatarFallback>N/A</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium hover:text-primary">
                    <Link
                      href={`${path.dashboard.fighters.base}/${club.ownerId}`}
                    >
                      {club.ownerName}
                    </Link>
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`mailto:${club.ownerEmail}`}
                    className="text-sm hover:underline"
                  >
                    {club.ownerEmail}
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
