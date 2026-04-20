import { useDeleteProjects } from "../DeleteProjectsContext";
import { useDeleteProject } from "../DeleteProjectContext";
import { useUpdateProject } from "../UpdateProjectContext";

export function useProjectItemPending(projectId: number) {
  const { isPending: isDeleteProjectPending } = useDeleteProject();
  const { isPending: isDeleteProjectsPending, ids: projectIds } =
    useDeleteProjects();
  const { isPending: isUpdateProjectPending } = useUpdateProject();

  const isPending =
    isDeleteProjectPending ||
    isUpdateProjectPending ||
    (isDeleteProjectsPending && projectIds.includes(projectId));

  return isPending;
}
