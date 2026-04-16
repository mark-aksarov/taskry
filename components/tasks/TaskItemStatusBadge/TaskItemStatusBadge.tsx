import { useTranslations } from "next-intl";
import { TaskStatus } from "@/generated/prisma/enums";
import { ItemBaseBadge } from "@/components/common/ItemBase";
import { StatusLoader } from "@/components/common/StatusLoader";
import { useUpdateTaskStatus } from "../UpdateTaskStatusContext";
import { useUpdateTaskStatuses } from "../UpdateTaskStatusesContext";
import { getTaskStatusBadgeColor } from "../getTaskStatusBadgeColor";

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
  const t = useTranslations("tasks.TaskStatus");

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

  const color = getTaskStatusBadgeColor(status, deadline);

  return (
    <ItemBaseBadge className={className} color={isPending ? "gray" : color}>
      {isPending ? <StatusLoader /> : t(`${status}`)}
    </ItemBaseBadge>
  );
}
