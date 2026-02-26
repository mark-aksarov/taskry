import {
  useUpdateTaskStatusContext,
  useUpdateTaskStatusesContext,
} from "../UpdateTaskStatusContext";

import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { TaskStatus } from "@/generated/prisma/enums";
import { ItemBaseBadge } from "@/components/common/ItemBase";
import { getTaskStatusBadgeColor } from "../getTaskStatusBadgeColor";

interface TaskItemBaseBadgeProps {
  className?: string;
  status: TaskStatus;
  isSelected?: boolean;
  deadline: string;
}

export function TaskItemBaseBadge({
  className,
  status,
  isSelected,
  deadline,
}: TaskItemBaseBadgeProps) {
  const t = useTranslations("tasks.TaskStatus");

  // Show loader when updating task status
  const { isPending: isUpdateTaskStatusPending } = useUpdateTaskStatusContext();
  const { isPending: isUpdateTaskStatusesPending } =
    useUpdateTaskStatusesContext();

  const isPending =
    isUpdateTaskStatusPending || (isUpdateTaskStatusesPending && isSelected);

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
