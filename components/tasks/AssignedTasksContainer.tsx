import "server-only";

import { Suspense } from "react";
import { TaskListSkeleton } from "./TaskList";
import { TaskListItemDTO } from "@/lib/data/task/task.dto";
import { AssignedTasksDynamic } from "./AssignedTasksDynamic";
import { AssignedTasksSection } from "./AssignedTasksSection";
import { AssignedTasksSectionHeading } from "./AssignedTasksSectionHeading";

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
          <TaskListSkeleton items={10} showCheckbox={false} />
        </AssignedTasksSection>
      }
    >
      <AssignedTasksContainerInner {...props} />
    </Suspense>
  );
}

async function AssignedTasksContainerInner({
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
