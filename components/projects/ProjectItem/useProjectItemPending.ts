import { useDeleteProjects } from "../DeleteProjectsContext";
import { useDeleteProjectTransition } from "../DeleteProjectTransitionContext";
import { useUpdateProjectTransition } from "../UpdateProjectTransitionContext";

export function useProjectItemPending(projectId: number) {
  const { isPending: isDeleteProjectPending } = useDeleteProjectTransition();
  const { isPending: isDeleteProjectsPending, projectIds } =
    useDeleteProjects();
  const { isPending: isUpdateProjectPending } = useUpdateProjectTransition();

  const isPending =
    isDeleteProjectPending ||
    isUpdateProjectPending ||
    (isDeleteProjectsPending && projectIds.includes(projectId));

  return isPending;
}
