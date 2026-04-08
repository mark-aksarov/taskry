import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { ProjectStatus } from "@/generated/prisma/enums";
import { ItemBaseBadge } from "@/components/common/ItemBase";
import { useUpdateProjectStatus } from "../UpdateProjectStatusContext";
import { useUpdateProjectStatuses } from "../UpdateProjectStatusesContext";
import { getProjectStatusBadgeColor } from "../getProjectStatusBadgeColor";

interface ProjectItemBaseBadgeProps {
  projectId: number;
  deadline: string;
  className?: string;
  status: ProjectStatus;
}

export function ProjectItemBaseBadge({
  projectId,
  deadline,
  className,
  status,
}: ProjectItemBaseBadgeProps) {
  const t = useTranslations("projects.ProjectStatus");

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

  // Check if the project is overdue
  const isOverdue =
    new Date(deadline) < new Date() && status !== ProjectStatus.completed;

  const color = isOverdue ? "red" : getProjectStatusBadgeColor(status);

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
        t(`${status}`)
      )}
    </ItemBaseBadge>
  );
}
