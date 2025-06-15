"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Calendar,
  Ruler,
  Weight,
  Trophy,
  Flame,
  BicepsFlexed,
  Dumbbell,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { calculateAge } from "@/lib/utils";
import { FighterProfileResponse } from "@/domains/fighter-profile";

type FighterCardProps = {
  fighter: FighterProfileResponse;
};
export default function FighterMatchCard({ fighter }: FighterCardProps) {
  const age = calculateAge(fighter.dateOfBirth);

  return (
    <div className="flex justify-center items-center p-4">
    <Card className="w-full max-w-sm overflow-hidden py-0 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-black shadow-2xl border-0 transform transition-transform hover:scale-102">
      <div className="relative py-4 bg-gradient-to-br from-yellow-200 via-yellow-300 to-amber-300 dark:from-yellow-400 dark:via-yellow-500 dark:to-amber-500 flex items-center justify-center">
        <div className="absolute inset-0  dark:bg-black/20" />
        <div className="relative flex items-center gap-5 justify-center z-10">
          <Avatar className="h-20 w-20 border-2 border-white/30">
            <AvatarImage src="/nextgen.jpeg" alt="Profile picture" />
            <AvatarFallback>{fighter.name?.charAt(0) || "?"}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-bold mb-1">
              {fighter.name || "Unknown Fighter"}
            </h1>
            <div className="flex flex-col items-start justify-center gap-2 text-sm opacity-90">
              {fighter.club && (
                <div className="flex items-center gap-1">
                  <Dumbbell className="w-4 h-4" />
                  <span>{fighter.club.name}</span>
                </div>
              )}
              {age && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{age} years old</span>
                </div>
              )}
              <div className="flex gap-2">
                {fighter.gender && (
                  <Badge
                    variant="secondary"
                    className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-700"
                  >
                    {fighter.gender}
                  </Badge>
                )}
                {fighter.category && (
                  <div>
                    <Badge
                      variant="secondary"
                      className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-700"
                    >
                      {fighter.category.name}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <CardContent className="p-6 pt-0 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
            <Weight className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Weight
              </div>
              <div className="font-semibold text-gray-900 dark:text-gray-100">
                {fighter.weight} lbs
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
            <Ruler className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Height
              </div>
              <div className="font-semibold text-gray-900 dark:text-gray-100">
                {fighter.height}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
            Fight Record
          </h3>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {fighter.wins || 0}
              </div>
              <div className="text-xs text-green-700 dark:text-green-300">
                Wins
              </div>
            </div>
            <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {fighter.losses || 0}
              </div>
              <div className="text-xs text-red-700 dark:text-red-300">
                Losses
              </div>
            </div>
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-gray-600 dark:text-gray-300">
                {fighter.draws || 0}
              </div>
              <div className="text-xs text-gray-700 dark:text-gray-400">
                Draws
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
            <BicepsFlexed className="w-5 h-5 text-red-500 dark:text-red-400" />
            <div className="text-center">
              <div className="text-sm text-red-600 dark:text-red-300">
                Knockouts
              </div>
              <div className="font-bold text-red-700 dark:text-red-200">
                {fighter.kos || 0}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
            <Flame className="w-5 h-5 text-orange-500 dark:text-orange-400" />
            <div className="text-center">
              <div className="text-sm text-orange-600 dark:text-orange-300">
                Win Streak
              </div>
              <div className="font-bold text-orange-700 dark:text-orange-200">
                {fighter.winsInARow || 0}
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">
            Fighting Styles
          </h3>
          <div className="flex flex-wrap gap-2">
            {fighter.styles.length > 0 ? (
              fighter.styles.map((style, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-700"
                >
                  {style.name}
                </Badge>
              ))
            ) : (
              <Badge
                variant="secondary"
                className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-700"
              >
                None
              </Badge>
            )}
          </div>
        </div>
        {fighter.location && (
          <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <MapPin className="w-5 h-5 text-blue-500 dark:text-blue-400" />
            <div>
              <div className="text-sm text-blue-600 dark:text-blue-300">
                Distance
              </div>
              <div className="font-semibold text-blue-700 dark:text-blue-200">
                {fighter.distanceFromTarget
                  ? `${fighter.distanceFromTarget.toFixed(2)} km`
                  : "N/A"}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
    </div>
  );
}
