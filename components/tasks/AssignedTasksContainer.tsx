"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { TaskListSkeleton } from "./TaskList";
import { TaskGridMobileSkeleton } from "./TaskGrid";
import { TaskListItemDTO } from "@/lib/data/task/task.dto";
import { AssignedTasksSection } from "./AssignedTasksSection";
import { AssignedTasksSectionHeading } from "./AssignedTasksSectionHeading";

const AssignedTasksDynamic = dynamic(
  () =>
    import("./AssignedTasksDynamic").then((mod) => mod.AssignedTasksDynamic),
  {
    ssr: false,
    loading: () => (
      <AssignedTasksSection>
        <AssignedTasksSectionHeading />
        <TaskListSkeleton
          items={10}
          showCheckbox={false}
          className="max-md:hidden"
        />
        <TaskGridMobileSkeleton items={10} className="md:hidden" />
      </AssignedTasksSection>
    ),
  },
);

interface AssignedTasksContainerProps {
  tasks: TaskListItemDTO[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export function AssignedTasksContainer(props: AssignedTasksContainerProps) {
  return (
    <Suspense
      fallback={
        <AssignedTasksSection>
          <AssignedTasksSectionHeading />
          <TaskListSkeleton
            items={10}
            showCheckbox={false}
            className="max-md:hidden"
          />
          <TaskGridMobileSkeleton items={10} className="md:hidden" />
        </AssignedTasksSection>
      }
    >
      <AssignedTasksContainerInner {...props} />
    </Suspense>
  );
}

function AssignedTasksContainerInner({
  tasks,
  totalCount,
  page,
  pageSize,
}: AssignedTasksContainerProps) {
  return (
    <AssignedTasksDynamic
      page={page}
      pageSize={pageSize}
      tasks={tasks}
      totalPages={Math.ceil(totalCount / pageSize)}
      totalCount={totalCount}
    />
  );
}
