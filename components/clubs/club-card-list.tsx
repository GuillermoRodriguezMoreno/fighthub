"use client";
import { path } from "@/config/path";
import { ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../core/loading-spinner";
import { AlertInfo } from "../core/alert-info";
import { ClubResponse } from "@/domains/club";
import { UseGetClubsQuery } from "@/hooks/club/use-get-clubs-query";
import { UseGetMyClubsQuery } from "@/hooks/club/use-get-my-clubs-query";
import { defaultClubsQueryParams } from "@/clients/types";
import Image from "next/image";
import { DEFAULT_IMAGE_URL } from "@/domains/utils";

type ClubCardProps = {
  club: ClubResponse;
};

export function ClubCard({ club }: ClubCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`${path.dashboard.clubs.base}/${club.id}`)}
      className="group flex flex-col justify-between cursor-pointer"
    >
      <div>
        <div className="flex aspect-[3/2] overflow-clip rounded-xl">
          <div className="flex-1">
            <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
              <Image
                src={club.profilePicture || DEFAULT_IMAGE_URL}
                alt={club.name}
                className="h-full w-full object-cover object-center"
                layout="fill"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mb-2 line-clamp-3 break-words pt-4 text-lg font-medium md:mb-3 md:pt-4 md:text-xl lg:pt-4 lg:text-2xl">
        {club.name}
      </div>
      <div className="mb-8 line-clamp-2 text-sm text-muted-foreground md:mb-12 md:text-base lg:mb-9">
        {club.description}
      </div>
      <div className="flex items-center text-sm">
        See more{" "}
        <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );
}

export function AllClubsListContainer() {
  const allClubsQuery = UseGetClubsQuery(defaultClubsQueryParams);
  const isLoading = allClubsQuery.isLoading;
  const isError = allClubsQuery.isError;
  const clubs = allClubsQuery.data?.content || [];
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return (
      <AlertInfo
        variant="destructive"
        title="Error loading clubs"
        description="There was an error loading the clubs. Please try again later."
      />
    );
  }
  if (clubs.length === 0) {
    return <AlertInfo title="No clubs found" />;
  }
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {clubs.map((club) => (
        <ClubCard key={club.id} club={club} />
      ))}
    </div>
  );
}

export function MyClubsListContainer() {
  const session = useSession();
  const ownerEmail = session.data?.user?.email || "";
  const myClubsQuery = UseGetMyClubsQuery(ownerEmail, !!ownerEmail);
  const isLoading = myClubsQuery.isLoading || !myClubsQuery.data;
  const isError = myClubsQuery.isError;
  const clubs = myClubsQuery.data || [];
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return (
      <AlertInfo
        variant="destructive"
        title="Error loading your clubs"
        description="There was an error loading your clubs. Please try again later."
      />
    );
  }
  if (clubs.length === 0) {
    return <AlertInfo title="No clubs found" />;
  }
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {clubs.map((club) => (
        <ClubCard key={club.id} club={club} />
      ))}
    </div>
  );
}
