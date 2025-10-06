import { PageGrid } from "@/components/common/PageGrid";
import {
  ActiveProjectsCard,
  ActiveProjectsCardSkeleton,
} from "@/components/dashboard/ActiveProjectsCard";
import {
  ActiveTasksCard,
  ActiveTasksCardSkeleton,
} from "@/components/dashboard/ActiveTasksCard";
import {
  StorageLimitCard,
  StorageLimitCardSkeleton,
} from "@/components/dashboard/StorageLimitCard";
import {
  TasksDoneCard,
  TasksDoneCardSkeleton,
} from "@/components/dashboard/TasksDoneCard";
import { AssignedTasks } from "@/components/tasks/AssignedTasks";
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <PageGrid>
      <h2 className="text-xl font-extrabold md:hidden">Dashboard</h2>
      <div className="grid max-md:grid-cols-1 max-md:gap-4 md:gap-6 md:max-xl:grid-cols-2 xl:grid-cols-4">
        <Suspense fallback={<ActiveProjectsCardSkeleton />}>
          <ActiveProjectsCard />
        </Suspense>

        <Suspense fallback={<ActiveTasksCardSkeleton />}>
          <ActiveTasksCard />
        </Suspense>

        <Suspense fallback={<TasksDoneCardSkeleton />}>
          <TasksDoneCard />
        </Suspense>

        <Suspense fallback={<StorageLimitCardSkeleton />}>
          <StorageLimitCard />
        </Suspense>
      </div>

      <AssignedTasks />
    </PageGrid>
  );
}
