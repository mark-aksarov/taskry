import { Skeleton } from "@/ui/Skeleton";
import { TotalProjectsCardLayout } from "./TotalProjectsCardLayout";

export const TotalProjectsCardSkeleton = () => {
  return (
    <TotalProjectsCardLayout>
      <Skeleton className="w-[3rem]" size="xl" />
    </TotalProjectsCardLayout>
  );
};
