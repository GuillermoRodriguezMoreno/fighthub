import { BicepsFlexed, Skull, Swords, Trophy } from "lucide-react";
import { Badge } from "../ui/badge";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Card, CardContent } from "../ui/card";
import { FighterProfileResponse } from "@/domains/fighter-profile";

type FighterProfileMasonryProps = {
  fighterProfile: FighterProfileResponse;
};
export default function FighterProfileMasonry({
  fighterProfile,
}: FighterProfileMasonryProps) {
  return (
    <div className="grid gap-4 lg:gap-6 xl:gap-10">
      <div className="grid grid-cols-1 gap-y-4 sm:gap-4  sm:grid-cols-3 lg:gap-6 xl:gap-10">
        <div className="col-span-2 flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Record</h2>
          <Card>
            <CardContent className="flex justify-around items-center space-x-4">
              <div className="flex flex-col items-center gap-2">
                <Trophy className="w-10 h-10" />
                <div className="grid items-center grid-rows-2">
                  <Label className="text-xl">Wins</Label>
                  <p className="text-3xl font-extrabold text-center">
                    {fighterProfile.wins || 0}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Skull className="w-10 h-10" />
                <div className="grid items-center grid-rows-2">
                  <Label className="text-xl">Losses</Label>
                  <p className="text-3xl font-extrabold text-center">
                    {fighterProfile.losses || 0}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Swords className="w-10 h-10" />
                <div className="grid items-center grid-rows-2">
                  <Label className="text-xl">Draws</Label>
                  <p className="text-3xl font-extrabold text-center">
                    {fighterProfile.draws || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-1 flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Ko&apos;s</h2>
          <Card>
            <CardContent className="flex justify-center items-center space-x-4">
              <div className="flex flex-col items-center gap-2">
                <BicepsFlexed className="w-10 h-10" />
                <div className="grid items-center grid-rows-2">
                  <Label className="text-xl">Ko&apos;s</Label>
                  <p className="text-3xl font-extrabold text-center">
                    {fighterProfile.kos || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Styles</h2>
        <Card>
          <CardContent className="space-x-4">
            {fighterProfile.styles.length > 0 ? (
              <div className="flex gap-2">
                {fighterProfile.styles.map((style, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {style.name}
                  </Badge>
                ))}
              </div>
            ) : (
              "Your styles will be displayed here..."
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
