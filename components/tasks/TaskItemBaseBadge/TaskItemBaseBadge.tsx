import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { TaskStatus } from "@/generated/prisma/enums";
import { ItemBaseBadge } from "@/components/common/ItemBase";
import { getTaskStatusBadgeColor } from "../getTaskStatusBadgeColor";
import { useUpdateTaskStatusContext } from "../UpdateTaskStatusContext";

interface TaskItemBaseBadgeProps {
  className?: string;
  status: TaskStatus;
}

export function TaskItemBaseBadge({
  className,
  status,
}: TaskItemBaseBadgeProps) {
  const t = useTranslations("tasks.TaskStatus");

  const { isUpdateTaskStatusPending } = useUpdateTaskStatusContext();

  return (
    <ItemBaseBadge
      className={className}
      color={
        isUpdateTaskStatusPending ? "gray" : getTaskStatusBadgeColor(status)
      }
    >
      {isUpdateTaskStatusPending ? (
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
