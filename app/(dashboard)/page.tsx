import { ActiveProjectsCard } from "@/components/dashboard/ActiveProjectsCard";
import { ActiveTasksCard } from "@/components/dashboard/ActiveTasksCard";
import { TasksDoneCard } from "@/components/dashboard/TasksDoneCard";
import { StorageLimitCard } from "@/components/dashboard/StorageLimitCard";
import { CardHeading } from "@/components/common/Card";
import { TaskList } from "@/components/tasks/TaskList";
import { Suspense } from "react";
import { PaginationSkeleton } from "@/components/common/Pagination";
import { ListSkeleton } from "@/components/common/ListSkeleton";
import { TaskItem } from "@/components/tasks/TaskItem";
import { ActiveProjectsCardSkeleton } from "@/components/dashboard/ActiveProjectsCard/ActiveProjectsCard";
import { ActiveTasksCardSkeleton } from "@/components/dashboard/ActiveTasksCard/ActiveTasksCard";
import { TasksDoneCardSkeleton } from "@/components/dashboard/TasksDoneCard/TasksDoneCard";
import { StorageLimitCardSkeleton } from "@/components/dashboard/StorageLimitCard/StorageLimitCard";

export default async function DashboardPage() {
  return (
    <>
      <div className="flex flex-col max-md:gap-4 md:gap-6">
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

        <div className="flex flex-col gap-4">
          <CardHeading>Assigned Tasks</CardHeading>
          <Suspense
            fallback={
              <>
                <ListSkeleton items={10} renderItem={() => <TaskItem />} />
                <PaginationSkeleton />
              </>
            }
          >
            <TaskList />
          </Suspense>
        </div>
      </div>
    </>
  );
}
