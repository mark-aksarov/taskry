import { useTranslations } from "next-intl";
import { TaskStatus } from "@/generated/prisma/enums";
import { StatusLoader } from "../common/StatusLoader";
import { ItemBaseBadge } from "@/dashboard/common/ItemBase";
import { getTaskStatusBadgeColor } from "./getTaskStatusBadgeColor";

interface TaskStatusBadgeProps {
  isPending?: boolean;
  className?: string;
  status: TaskStatus;
  deadline: string;
}

export function TaskStatusBadge({
  isPending,
  className,
  status,
  deadline,
}: TaskStatusBadgeProps) {
  const t = useTranslations("dashboard.tasks.TaskStatus");

  const color = getTaskStatusBadgeColor(status, deadline);

  return (
    <ItemBaseBadge className={className} color={isPending ? "gray" : color}>
      {isPending ? <StatusLoader /> : t(`${status}`)}
    </ItemBaseBadge>
  );
}
