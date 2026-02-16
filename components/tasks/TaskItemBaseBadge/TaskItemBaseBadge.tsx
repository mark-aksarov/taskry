import {
  useUpdateTaskStatusContext,
  useUpdateTaskStatusesContext,
} from "../UpdateTaskStatusContext";

import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { TaskStatus } from "@/generated/prisma/enums";
import { ItemBaseBadge } from "@/components/common/ItemBase";
import { getTaskStatusBadgeColor } from "../getTaskStatusBadgeColor";
import { useSelectedTasks } from "../SelectedTasksContext";

interface TaskItemBaseBadgeProps {
  taskId: number;
  className?: string;
  status: TaskStatus;
}

export function TaskItemBaseBadge({
  taskId,
  className,
  status,
}: TaskItemBaseBadgeProps) {
  const t = useTranslations("tasks.TaskStatus");

  const { isPending: isUpdateTaskStatusPending } = useUpdateTaskStatusContext();
  const { isPending: isUpdateTaskStatusesPending } =
    useUpdateTaskStatusesContext();

  const selected = useSelectedTasks();

  const isPending =
    isUpdateTaskStatusPending ||
    (isUpdateTaskStatusesPending && !!selected.get(taskId));

  return (
    <ItemBaseBadge
      className={className}
      color={isPending ? "gray" : getTaskStatusBadgeColor(status)}
    >
      {isPending ? (
        <Loader2
          data-testid="loader-icon"
          size={16}
          strokeWidth={1.5}
          absoluteStrokeWidth
          className="animate-spin text-gray-400 dark:text-gray-900"
        />
      ) : (
        t(`${status}`)
      )}
    </ItemBaseBadge>
  );
}
