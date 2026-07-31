import { useTranslations } from "next-intl";
import { StatusLoader } from "../common/StatusLoader";
import { ProjectStatus } from "@/generated/prisma/enums";
import { ItemBaseBadge } from "@/dashboard/common/ItemBase";
import { getProjectStatusBadgeColor } from "./getProjectStatusBadgeColor";

interface ProjectStatusBadgeProps {
  isPending?: boolean;
  className?: string;
  status: ProjectStatus;
  deadline: string;
}

export function ProjectStatusBadge({
  isPending,
  className,
  status,
  deadline,
}: ProjectStatusBadgeProps) {
  const t = useTranslations("dashboard.projects.ProjectStatus");

  const color = getProjectStatusBadgeColor(status, deadline);

  return (
    <ItemBaseBadge className={className} color={isPending ? "gray" : color}>
      {isPending ? <StatusLoader /> : t(`${status}`)}
    </ItemBaseBadge>
  );
}
