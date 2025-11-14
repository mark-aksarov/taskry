import { Skeleton } from "@/components/ui";
import { TotalUsersCardLayout } from "./TotalUsersCardLayout";

export const TotalUsersCardSkeleton = () => {
  return (
    <TotalUsersCardLayout>
      <Skeleton className="w-[3rem]" size="xl" />
    </TotalUsersCardLayout>
  );
};
