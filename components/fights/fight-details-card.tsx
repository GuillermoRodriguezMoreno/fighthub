import { Calendar, MapPin, Clock, Pen } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { FightResponse } from "@/domains/fight";
import FightCardDetailsContent from "./fight-page-card";

export default function FightDetailsCard({
  fight,
  clickEdit,
  isOrganizer = false,
}: {
  fight: FightResponse;
  clickEdit?: () => void;
  isOrganizer?: boolean;
}) {
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
      <FightCardDetailsContent fight={fight} />
    </div>
  );
}
