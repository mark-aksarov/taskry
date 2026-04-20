import { useTranslations } from "next-intl";
import { ProjectStatus } from "@/generated/prisma/enums";
import { ItemBaseBadge } from "@/dashboard/common/ItemBase";
import { StatusLoader } from "@/dashboard/common/StatusLoader";
import { useUpdateProjectStatus } from "../UpdateProjectStatusContext";
import { useUpdateProjectStatuses } from "../UpdateProjectStatusesContext";
import { getProjectStatusBadgeColor } from "../getProjectStatusBadgeColor";

interface ProjectItemStatusBadgeProps {
  projectId: number;
  deadline: string;
  className?: string;
  status: ProjectStatus;
}

export function ProjectItemStatusBadge({
  projectId,
  deadline,
  className,
  status,
}: ProjectItemStatusBadgeProps) {
  const t = useTranslations("dashboard.projects.ProjectStatus");

  // Pending state for single project status update
  const { isPending: isUpdateProjectStatusPending } = useUpdateProjectStatus();

  // Pending state for batch project status updates
  const { isPending: isUpdateProjectStatusesPending, ids: updatedProjectIds } =
    useUpdateProjectStatuses();

  // Whether this project is included in the current batch update
  const isProjectInBatchUpdate = updatedProjectIds.includes(projectId);

  // Combined pending state for this project
  const isPending =
    isUpdateProjectStatusPending ||
    (isUpdateProjectStatusesPending && isProjectInBatchUpdate);

  const color = getProjectStatusBadgeColor(status, deadline);

  return (
    <ItemBaseBadge className={className} color={isPending ? "gray" : color}>
      {isPending ? <StatusLoader /> : t(`${status}`)}
    </ItemBaseBadge>
  );
}
