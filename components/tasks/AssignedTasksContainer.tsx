"use client";

import dynamic from "next/dynamic";
import { TaskListSkeleton } from "./TaskList";
import { TaskGridMobileSkeleton } from "./TaskGrid";
import { TaskListItemDTO } from "@/lib/data/task/task.dto";

const AssignedTasksDynamic = dynamic(
  () =>
    import("./AssignedTasksDynamic").then((mod) => mod.AssignedTasksDynamic),
  {
    ssr: false,
    loading: () => (
      <>
        <TaskListSkeleton
          items={10}
          showCheckbox={false}
          className="max-md:hidden"
        />
        <TaskGridMobileSkeleton items={10} className="md:hidden" />
      </>
    ),
  },
);

interface AssignedTasksContainerProps {
  tasks: TaskListItemDTO[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export function AssignedTasksContainer({
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
    />
  );
}
