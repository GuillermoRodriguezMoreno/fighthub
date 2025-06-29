import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import FighterProfileMasonry from "./fighter-profile-masonry";
import { FighterProfileResponse } from "@/domains/fighter-profile";

type FighterProfileInfoProps = {
  fighterProfile: FighterProfileResponse;
};
export default function FighterProfileInfo({
  fighterProfile,
}: FighterProfileInfoProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2 lg:gap-6 xl:gap-10">
      <div className="space-y-4 lg:col-span-2">
        <div className="flex items-center space-x-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={fighterProfile.profilePicture} />
            <AvatarFallback className="text-lg">N/A</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">
              {fighterProfile.name || "Your name..."}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              {fighterProfile.category
                ? fighterProfile.category.name
                : "No category..."}
            </p>
          </div>
        </div>
        <p className="text-gray-500 dark:text-gray-400">
          {fighterProfile.biography || ""}
        </p>
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Info</h2>
        <Card>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <p>{fighterProfile.name || "Your name..."}</p>
            </div>
            <div className="space-y-2">
              <Label>Bio</Label>
              <p className="min-h-[100px]">
                {fighterProfile.biography ||
                  "We want to know more about you..."}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      <FighterProfileMasonry fighterProfile={fighterProfile} />
    </div>
  );
}
