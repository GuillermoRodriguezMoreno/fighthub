"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UseGetFighterMatcherQuery } from "@/hooks/fighter-matcher/use-get-fighter-matcher-query";
import { useSession } from "next-auth/react";
import LoadingSpinner from "@/components/core/loading-spinner";
import { AlertError } from "@/components/core/alert-error";
import { AlertInfo } from "@/components/core/alert-info";
import { MatchesCarrousel } from "../matches-carrousel";
import { useUpdateFighterLocationMutation } from "@/hooks/fighter_profile/use-update-fighter-location-mutation";

export default function OpponentsPage() {
  const session = useSession();
  const fighterId = session.data?.userId || -1;
  const [coords, setCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Your browser does not support geolocation.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCoords({ latitude: coords.latitude, longitude: coords.longitude });
      },
      (err) => {
        setError(
          err.code === err.PERMISSION_DENIED
            ? "You denied location permission."
            : "Unable to retrieve your location.",
        );
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }, []);

  const { mutate: updateLocation, isSuccess: locationUpdated } =
    useUpdateFighterLocationMutation();

  useEffect(() => {
    if (coords && fighterId !== -1) {
      updateLocation({ fighterId, coords });
    }
  }, [coords, fighterId, updateLocation]);

  const queryEnabled =
    coords !== null &&
    coords.latitude !== 0 &&
    coords.longitude !== 0 &&
    fighterId !== -1 &&
    locationUpdated;
  // const fighterMatcherQuery = UseGetFighterMatcherQuery(1, queryEnabled);

  // if (fighterMatcherQuery.isLoading) {
  //   return <LoadingSpinner />;
  // }

  // if (fighterMatcherQuery.isError || !fighterMatcherQuery.data || error) {
  //   return <AlertError description={"An error has ocurred"} />;
  // }

  // if (fighterMatcherQuery.data.length === 0) {
  //   return <AlertInfo title={"No opponents found"} />;
  // }

  // return <MatchesCarrousel fighters={fighterMatcherQuery.data} />;
  return <MatchesCarrousel fighters={[]} />;
}
