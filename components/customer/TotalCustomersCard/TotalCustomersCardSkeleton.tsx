import { Skeleton } from "@/components/ui";
import { TotalCustomersCardLayout } from "./TotalCustomersCardLayout";

export const TotalCustomersCardSkeleton = () => {
  return (
    <TotalCustomersCardLayout>
      <Skeleton className="w-[3rem]" size="xl" />
    </TotalCustomersCardLayout>
  );
};
