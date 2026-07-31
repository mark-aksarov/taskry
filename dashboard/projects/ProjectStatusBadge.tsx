"use client";

import { useTranslations } from "next-intl";
import { StatusLoader } from "../common/StatusLoader";
import { useDeadline } from "../common/DeadlineContext";
import { ProjectStatus } from "@/generated/prisma/enums";
import { ItemBaseBadge } from "@/dashboard/common/ItemBase";
import { getProjectStatusBadgeColor } from "./getProjectStatusBadgeColor";

interface ProjectStatusBadgeProps {
  isPending?: boolean;
  className?: string;
  status: ProjectStatus;
}

export function ProjectStatusBadge({
  isPending,
  className,
  status,
}: ProjectStatusBadgeProps) {
  const t = useTranslations("dashboard.projects.ProjectStatus");
  const { overdue } = useDeadline();

  const color = getProjectStatusBadgeColor(status, !!overdue);

  return (
    <ItemBaseBadge className={className} color={isPending ? "gray" : color}>
      {isPending ? <StatusLoader /> : t(`${status}`)}
    </ItemBaseBadge>
  );
}
