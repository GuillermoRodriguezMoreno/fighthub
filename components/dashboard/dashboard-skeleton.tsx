import { JSX } from "react";
import { Skeleton } from "../ui/skeleton";

export const DashboardSkeleton = (): JSX.Element => {
  return (
    <Skeleton>
      <div className="flex flex-col gap-20">
        <div className="flex h-128 w-full"></div>
      </div>
    </Skeleton>
  );
};
