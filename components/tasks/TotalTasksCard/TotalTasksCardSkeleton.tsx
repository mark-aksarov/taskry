import { Skeleton } from "@/components/ui/Skeleton";
import { TotalTasksCardLayout } from "./TotalTasksCardLayout";

export const TotalTasksCardSkeleton = () => {
  return (
    <TotalTasksCardLayout>
      <Skeleton className="w-[3rem]" size="xl" />
    </TotalTasksCardLayout>
  );
};
