import { ActiveProjectsCard } from "@/components/dashboard/ActiveProjectsCard";
import { ActiveTasksCard } from "@/components/dashboard/ActiveTasksCard";
import { TasksDoneCard } from "@/components/dashboard/TasksDoneCard";
import { StorageLimitCard } from "@/components/dashboard/StorageLimitCard";
import { Card, CardHeading } from "@/components/common/Card";
import { TaskList } from "@/components/tasks/TaskList";
import { Suspense } from "react";
import { Pagination } from "@/components/common/Pagination";
import { TaskCommentList } from "@/components/tasks/TaskCommentList/TaskCommentList";
import { twMerge } from "tailwind-merge";

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
        <h2 className="text-xl font-bold md:hidden">Dashboard</h2>
        <ActiveProjectsCard />
        <ActiveTasksCard />
        <TasksDoneCard />
        <StorageLimitCard />

        <div className="max-lg:col-start-1 max-lg:col-end-3 lg:col-start-1 lg:col-end-3 lg:row-start-2 lg:row-end-4">
          <Card>
            <div className="flex flex-col gap-4">
              <CardHeading>Tasks</CardHeading>
              <Suspense fallback={<div>Loading</div>}>
                <TaskList />
              </Suspense>
              <Pagination />
            </div>
          </Card>
        </div>

        <div className="max-lg:col-start-1 max-lg:col-end-3">
          <Card>
            <div className="flex flex-col gap-4">
              <CardHeading>Task comments</CardHeading>
              <Suspense fallback={<div>Loading</div>}>
                <TaskCommentList />
              </Suspense>
              <Pagination />
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
