import { Skeleton } from "@/ui/Skeleton";
import { TotalClientsCardLayout } from "./TotalClientsCardLayout";

export const TotalClientsCardSkeleton = () => {
  return (
    <TotalClientsCardLayout>
      <Skeleton className="w-[3rem]" size="xl" />
    </TotalClientsCardLayout>
  );
};
