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
}

export function TaskItemBaseBadge({
  className,
  status,
  isSelected,
}: TaskItemBaseBadgeProps) {
  const t = useTranslations("tasks.TaskStatus");

  // Show loader when updating task status
  const { isPending: isUpdateTaskStatusPending } = useUpdateTaskStatusContext();
  const { isPending: isUpdateTaskStatusesPending } =
    useUpdateTaskStatusesContext();

  const isPending =
    isUpdateTaskStatusPending || (isUpdateTaskStatusesPending && isSelected);

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
