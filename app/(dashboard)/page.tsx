import { ActiveProjectsCard } from "@/components/dashboard/ActiveProjectsCard";
import { ActiveTasksCard } from "@/components/dashboard/ActiveTasksCard";
import { TasksDoneCard } from "@/components/dashboard/TasksDoneCard";
import { StorageLimitCard } from "@/components/dashboard/StorageLimitCard";
import { Card, CardHeading } from "@/components/common/Card";
import { TaskList } from "@/components/tasks/TaskList";
import { Suspense } from "react";
import { Pagination, PaginationSkeleton } from "@/components/common/Pagination";
import { twMerge } from "tailwind-merge";
import { UserList } from "@/components/users/UserList";
import { ListSkeleton } from "@/components/common/ListSkeleton";
import { TaskItem } from "@/components/tasks/TaskItem";
import { UserItem } from "@/components/users/UserItem";
import { ActiveProjectsCardSkeleton } from "@/components/dashboard/ActiveProjectsCard/ActiveProjectsCard";
import { ActiveTasksCardSkeleton } from "@/components/dashboard/ActiveTasksCard/ActiveTasksCard";
import { TasksDoneCardSkeleton } from "@/components/dashboard/TasksDoneCard/TasksDoneCard";
import { StorageLimitCardSkeleton } from "@/components/dashboard/StorageLimitCard/StorageLimitCard";

export default async function DashboardPage() {
  return (
    <>
      <div
        className={twMerge(
          "max-md:flex max-md:w-full max-md:flex-col max-md:gap-5",
          "lg:grid lg:grid-cols-[3fr_3fr_4fr] lg:grid-rows-[10rem_10rem_auto] lg:gap-7.5",
          "md:max-lg:grid md:max-lg:grid-cols-[1fr_1fr] md:max-lg:grid-rows-[10rem_10rem_auto] md:max-lg:gap-6",
        )}
      >
        <h2 className="text-xl font-extrabold md:hidden">Dashboard</h2>
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

        <div className="max-lg:col-start-1 max-lg:col-end-3 lg:col-start-1 lg:col-end-3 lg:row-start-2 lg:row-end-4">
          <Card>
            <div className="flex flex-col gap-4">
              <CardHeading>Tasks</CardHeading>
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
          </Card>
        </div>

        <div className="max-lg:col-start-1 max-lg:col-end-3">
          <Card>
            <div className="flex flex-col gap-4">
              <CardHeading>Team</CardHeading>
              <Suspense
                fallback={
                  <>
                    <ListSkeleton items={10} renderItem={() => <UserItem />} />
                    <PaginationSkeleton />
                  </>
                }
              >
                <UserList />
              </Suspense>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
