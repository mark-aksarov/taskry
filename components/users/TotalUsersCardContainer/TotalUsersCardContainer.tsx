import "server-only";

import { Suspense } from "react";
import { getUserCount } from "@/lib/data/user/user.dal";
import { TotalUsersCard, TotalUsersCardSkeleton } from "../TotalUsersCard";

export const TotalUsersCardContainer = () => {
  return (
    <Suspense fallback={<TotalUsersCardSkeleton />}>
      <TotalUsersCardContainerInner />
    </Suspense>
  );
};

const TotalUsersCardContainerInner = async () => {
  const totalUsers = await getUserCount();

  return <TotalUsersCard totalUsers={totalUsers} />;
};
