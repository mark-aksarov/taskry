import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { ProjectStatus } from "@/generated/prisma/enums";
import { ItemBaseBadge } from "@/components/common/ItemBase";
import { getProjectStatusBadgeColor } from "../getProjectStatusBadgeColor";
import { useUpdateProjectStatuses } from "../UpdateProjectStatusesContext";
import { useUpdateProjectStatusTransition } from "../UpdateProjectStatusTransitionContext";

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

  const { isPending: isUpdateProjectStatusPending } =
    useUpdateProjectStatusTransition();
  const {
    isPending: isUpdateProjectStatusesPending,
    projectIds: updatedProjectIds,
  } = useUpdateProjectStatuses();

  const isPending =
    isUpdateProjectStatusPending ||
    (isUpdateProjectStatusesPending && updatedProjectIds.includes(projectId));

  const isOverdue = new Date(deadline) < new Date();

  const color = isOverdue ? "red" : getProjectStatusBadgeColor(status);
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
