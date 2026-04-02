"use client";

import dynamic from "next/dynamic";
import { TaskListItemDTO } from "@/lib/data/task/task.dto";
import { TaskGridMobileSkeleton } from "../tasks/TaskGrid";
import { UserTaskListSkeleton } from "./UserTaskList";

const UserTasksDynamic = dynamic(
  () => import("./UserTasksDynamic").then((mod) => mod.UserTasksDynamic),
  {
    ssr: false,
    loading: () => (
      <>
        <UserTaskListSkeleton className="max-md:hidden" items={10} />
        <TaskGridMobileSkeleton className="md:hidden" items={10} />
      </>
    ),
  },
);

interface UserTasksContainerProps {
  tasks: TaskListItemDTO[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export function UserTasksContainer({
  tasks,
  totalCount,
  page,
  pageSize,
}: UserTasksContainerProps) {
  return (
    <UserTasksDynamic
      page={page}
      pageSize={pageSize}
      tasks={tasks}
      totalPages={Math.ceil(totalCount / pageSize)}
    />
  );
}
