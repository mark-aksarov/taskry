import { Badge } from "../ui/Badge";
import { useTranslations } from "next-intl";
import { TaskStatus } from "@/generated/prisma/enums";
import { getTaskStatusBadgeColor } from "./getTaskStatusBadgeColor";

interface TaskStatusBadgeProps {
  className?: string;
  status: TaskStatus;
  deadline: string;
}

export function TaskStatusBadge({
  className,
  status,
  deadline,
}: TaskStatusBadgeProps) {
  const t = useTranslations("tasks.TaskStatus");

  const color = getTaskStatusBadgeColor(status, deadline);

  return (
    <Badge className={className} color={color}>
      {t(`${status}`)}
    </Badge>
  );
}
