import { TaskStatusBadge } from "../TaskStatusBadge";
import { TaskStatus } from "@/generated/prisma/enums";
import { useUpdateTaskStatus } from "../UpdateTaskStatusContext";
import { useUpdateTaskStatuses } from "../UpdateTaskStatusesContext";

interface TaskItemStatusBadgeProps {
  taskId: number;
  className?: string;
  status: TaskStatus;
  deadline: string;
}

export function TaskItemStatusBadge({
  taskId,
  className,
  status,
  deadline,
}: TaskItemStatusBadgeProps) {
  // Pending state for single task status update
  const { isPending: isUpdateTaskStatusPending } = useUpdateTaskStatus();

  // Pending state for batch task status updates
  const { isPending: isUpdateTaskStatusesPending, ids: updatedTaskIds } =
    useUpdateTaskStatuses();

  // Whether this task is included in the current batch update
  const isTaskInBatchUpdate = updatedTaskIds.includes(taskId);

  // Combined pending state for this task
  const isPending =
    isUpdateTaskStatusPending ||
    (isUpdateTaskStatusesPending && isTaskInBatchUpdate);

  return (
    <TaskStatusBadge
      isPending={isPending}
      status={status}
      className={className}
      deadline={deadline}
    />
  );
}
