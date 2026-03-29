import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { TaskStatus } from "@/generated/prisma/enums";
import { ItemBaseBadge } from "@/components/common/ItemBase";
import { useUpdateTaskStatus } from "../UpdateTaskStatusContext";
import { getTaskStatusBadgeColor } from "../getTaskStatusBadgeColor";
import { useUpdateTaskStatuses } from "../UpdateTaskStatusesContext";

interface TaskItemBaseBadgeProps {
  taskId: number;
  className?: string;
  status: TaskStatus;
  deadline: string;
}

export function TaskItemBaseBadge({
  taskId,
  className,
  status,
  deadline,
}: TaskItemBaseBadgeProps) {
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

  const isOverdue = new Date(deadline) < new Date();

  const color = isOverdue ? "red" : getTaskStatusBadgeColor(status);
  const text = isOverdue ? t("overdue") : t(`${status}`);

  return (
    <ItemBaseBadge className={className} color={isPending ? "gray" : color}>
      {isPending ? (
        <Loader2
          data-testid="loader-icon"
          size={16}
          strokeWidth={1.5}
          absoluteStrokeWidth
          className="animate-spin text-gray-400 dark:text-gray-900"
        />
      ) : (
        text
      )}
    </ItemBaseBadge>
  );
}
