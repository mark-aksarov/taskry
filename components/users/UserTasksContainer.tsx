import "server-only";

import { UserTasksDynamic } from "./UserTasksDynamic";
import { TaskListItemDTO } from "@/lib/data/task/task.dto";

interface UserTasksContainerProps {
  tasks: TaskListItemDTO[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export async function UserTasksContainer({
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
