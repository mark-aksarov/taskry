"use client";

import dynamic from "next/dynamic";
import { TaskListSkeleton } from "./TaskList";
import { TaskGridMobileSkeleton } from "./TaskGrid";
import { TaskListItemDTO } from "@/lib/data/task/task.dto";

const TasksDynamic = dynamic(
  () => import("./TasksDynamic").then((mod) => mod.TasksDynamic),
  {
    ssr: false,
    loading: () => (
      <>
        <TaskListSkeleton className="max-md:hidden" items={10} />
        <TaskGridMobileSkeleton className="md:hidden" items={10} />
      </>
    ),
  },
);

export interface TasksContainerProps {
  tasks: TaskListItemDTO[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export function TasksContainer({
  tasks,
  totalCount,
  page,
  pageSize,
}: TasksContainerProps) {
  return (
    <TasksDynamic
      page={page}
      pageSize={pageSize}
      tasks={tasks}
      totalPages={Math.ceil(totalCount / pageSize)}
    />
  );
}
