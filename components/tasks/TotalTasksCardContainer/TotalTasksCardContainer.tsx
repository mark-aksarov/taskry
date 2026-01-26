import "server-only";

import { Suspense } from "react";
import { getTaskCount } from "@/lib/data/task/task.dal";
import { TotalTasksCard, TotalTasksCardSkeleton } from "../TotalTasksCard";

export const TotalTasksCardContainer = () => {
  return (
    <Suspense fallback={<TotalTasksCardSkeleton />}>
      <TotalTasksCardContainerInner />
    </Suspense>
  );
};

const TotalTasksCardContainerInner = async () => {
  const totalTasks = await getTaskCount();

  return <TotalTasksCard totalTasks={totalTasks} />;
};
