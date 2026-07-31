"use client";

import { useTranslations } from "next-intl";
import { TaskStatus } from "@/generated/prisma/enums";
import { StatusLoader } from "../common/StatusLoader";
import { useDeadline } from "../common/DeadlineContext";
import { ItemBaseBadge } from "@/dashboard/common/ItemBase";
import { getTaskStatusBadgeColor } from "./getTaskStatusBadgeColor";

interface TaskStatusBadgeProps {
  isPending?: boolean;
  className?: string;
  status: TaskStatus;
}

export function TaskStatusBadge({
  isPending,
  className,
  status,
}: TaskStatusBadgeProps) {
  const t = useTranslations("dashboard.tasks.TaskStatus");
  const { overdue } = useDeadline();

  const color = getTaskStatusBadgeColor(status, !!overdue);

  return (
    <ItemBaseBadge className={className} color={isPending ? "gray" : color}>
      {isPending ? <StatusLoader /> : t(`${status}`)}
    </ItemBaseBadge>
  );
}
