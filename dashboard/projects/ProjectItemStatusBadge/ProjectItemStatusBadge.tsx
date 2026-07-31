import { ProjectStatus } from "@/generated/prisma/enums";
import { ProjectStatusBadge } from "../ProjectStatusBadge";
import { useUpdateProjectStatus } from "../UpdateProjectStatusContext";
import { useUpdateProjectStatuses } from "../UpdateProjectStatusesContext";

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

  return (
    <ProjectStatusBadge
      isPending={isPending}
      className={className}
      status={status}
      deadline={deadline}
    />
  );
}
