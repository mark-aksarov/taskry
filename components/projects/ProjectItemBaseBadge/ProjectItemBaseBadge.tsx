import {
  useUpdateProjectStatusContext,
  useUpdateProjectStatusesContext,
} from "../UpdateProjectStatusContext";

import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { ProjectStatus } from "@/generated/prisma/enums";
import { ItemBaseBadge } from "@/components/common/ItemBase";
import { getProjectStatusBadgeColor } from "../getProjectStatusBadgeColor";
import { useSelectedProjects } from "../SelectedProjectsContext";

interface ProjectItemBaseBadgeProps {
  projectId: number;
  className?: string;
  status: ProjectStatus;
}

export function ProjectItemBaseBadge({
  projectId,
  className,
  status,
}: ProjectItemBaseBadgeProps) {
  const t = useTranslations("projects.ProjectStatus");

  const { isPending: isUpdateProjectStatusPending } =
    useUpdateProjectStatusContext();
  const { isPending: isUpdateProjectStatusesPending } =
    useUpdateProjectStatusesContext();

  const selected = useSelectedProjects();

  const isPending =
    isUpdateProjectStatusPending ||
    (isUpdateProjectStatusesPending && !!selected.get(projectId));

  return (
    <ItemBaseBadge
      className={className}
      color={isPending ? "gray" : getProjectStatusBadgeColor(status)}
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
